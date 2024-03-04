package com.waves.eventservice.service.Impl;

import com.waves.eventservice.client.UserClient;
import com.waves.eventservice.model.Dto.ChatUser;
import com.waves.eventservice.model.Dto.EmailDto;
import com.waves.eventservice.model.Dto.JobRequestDto;
import com.waves.eventservice.model.Dto.UserDto;
import com.waves.eventservice.model.Enum.JobRequestStatus;
import com.waves.eventservice.model.Event;
import com.waves.eventservice.model.JobPost;
import com.waves.eventservice.model.JobRequest;
import com.waves.eventservice.model.Organizer;
import com.waves.eventservice.producer.ChatProducer;
import com.waves.eventservice.producer.EmailProducer;
import com.waves.eventservice.repository.JobRequestRepository;
import com.waves.eventservice.service.EventService;
import com.waves.eventservice.service.JobPostService;
import com.waves.eventservice.service.JobRequestService;
import com.waves.eventservice.service.OrganizerService;
import com.waves.eventservice.util.JobRequestSpecifications;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class JobRequestServiceImp implements JobRequestService {

    private final JobPostService jobPostService;

    private final JobRequestRepository jobRequestRepository;

    private final EmailProducer emailProducer;

    private final OrganizerService organizerService;

    private final ChatProducer chatProducer;

    @Override
    @Transactional
    public JobRequest applyForJob(Long jobPostId, JobRequestDto jobRequestDto) {
        return jobPostService.getByPostId(jobPostId)
                .filter(jobPost -> jobPost.getOpenPositions() > jobPost.getOrganizers().size())
                .map(jobPost -> {
                    JobRequest jobRequest = generateJobRequest(jobRequestDto, jobPost);
                    jobRequest.setJobRequestStatus(JobRequestStatus.PENDING);
                    log.debug("JobRequest created successfully with id:{}",jobRequest.getJobRequestId());
                    return jobRequestRepository.save(jobRequest);
                })
                .orElseThrow(() -> new IllegalStateException("Open positions have already been fulfilled for job post: " + jobPostId));
    }

    private static JobRequest generateJobRequest(JobRequestDto jobRequestDto, JobPost jobPost) {
        JobRequest jobRequest = new JobRequest();
        jobRequest.setJobPost(jobPost);
        jobRequest.setJobRequestStatus(JobRequestStatus.PENDING);
        jobRequest.setUserId(jobRequestDto.getUserId());
        jobRequest.setAbout(jobRequestDto.getAbout());
        jobRequest.setDesignation(jobRequestDto.getDesignation());
        jobRequest.setAadharNumber(jobRequestDto.getAadharNumber());
        jobRequest.setEmailId(jobRequestDto.getEmailId());
        jobRequest.setFullName(jobRequestDto.getFullName());
        jobRequest.setDietaryPreference(jobRequestDto.getDietaryPreference());
        return jobRequest;
    }

    @Override
    @Transactional
    public JobRequest approveJobRequest(Long jobRequestId) {

        JobRequest jobRequest = jobRequestRepository.findById(jobRequestId).orElseThrow(
                ()-> new NoSuchElementException("Job request not found with ID: " + jobRequestId)
        );

        JobPost jobPost = jobRequest.getJobPost();
        Set<Organizer> organizerSet = jobPostService.hiredUsersForEvent(jobPost.getJobPostId());
        boolean isUserPartOfOrganizerSet = organizerSet.stream()
                .anyMatch(organizer -> organizer.getUserId().equals(jobRequest.getJobRequestId()));
        if(isUserPartOfOrganizerSet){
            throw new IllegalStateException("User is part of the organizers set");
        }

        jobRequest.setJobRequestStatus(JobRequestStatus.APPROVED);
        jobRequestRepository.save(jobRequest);

        Organizer organizer = Organizer.builder()
                .jobPost(jobRequest.getJobPost())
                .jobRequest(jobRequest)
                .userId(jobRequest.getUserId())
                .build();

        Organizer savedOrganizer = organizerService.createOrganizer(organizer);
        ChatUser chatUser = ChatUser.builder()
                .userId(organizer.getUserId())
                .fullName(jobRequest.getFullName())
                .emailId(jobRequest.getEmailId())
                .eventId(jobPost.getEvent().getEventId())
                .eventName(jobPost.getEvent().getEventName())
                .build();
        chatProducer.createChatUser(chatUser);
        jobPostService.addOrganizer(jobPost.getJobPostId(),savedOrganizer);
        
        Event event = jobPost.getEvent();
        StringBuilder emailBodyBuilder = new StringBuilder();
        emailBodyBuilder.append("Dear ").append(jobRequest.getFullName()).append(",\n\n");
        emailBodyBuilder.append("Congratulations! We are pleased to inform you that you have been selected to be a part of the organizing team for the event \"")
                .append(event.getEventName()).append("\".\n\n");
        emailBodyBuilder.append("Event Details:\n");
        emailBodyBuilder.append("Event Name: ").append(event.getEventName()).append("\n");
        emailBodyBuilder.append("Event Date: ").append(event.getEventDate()).append("\n");
        emailBodyBuilder.append("Best regards,\nThe Organizing Team");

        EmailDto emailDto = new EmailDto(
                "Acceptance of Job Request",
                jobRequest.getEmailId(),
                emailBodyBuilder.toString()
        );
        emailProducer.sendEmail(emailDto);
        return jobRequest;
    }

    @Override
    public JobRequest rejectJobRequest(Long jobRequestId,String reason) {

        JobRequest jobRequest = jobRequestRepository.findById(jobRequestId).orElseThrow(
                ()->new NoSuchElementException("Job request not found with ID: " + jobRequestId)
        );
        jobRequest.setJobRequestStatus(JobRequestStatus.REJECTED);

        StringBuilder emailBodyBuilder = new StringBuilder();
        emailBodyBuilder.append("Dear ").append(jobRequest.getFullName()).append(",\n\n");
        emailBodyBuilder.append("We regret to inform you that you have not been selected to be a part of the organizing team.\n\n");
        emailBodyBuilder.append("Job Request Id:\n");
        emailBodyBuilder.append(jobRequestId).append("\n\n");
        emailBodyBuilder.append("Rejection Reason:\n");
        emailBodyBuilder.append(reason).append("\n\n");
        emailBodyBuilder.append("We appreciate your interest and thank you for your application.\n\n");
        emailBodyBuilder.append("Best regards,\nThe Organizing Team");
        EmailDto emailDto = new EmailDto(
                "Rejection of Job Request",
                jobRequest.getEmailId(),
                emailBodyBuilder.toString()
        );
        emailProducer.sendEmail(emailDto);

        return jobRequestRepository.save(jobRequest);
    }

    @Override
    public Page<JobRequest> getAllJobRequestsByJobPost(Long jobPostId,Pageable pageable) {

        Optional<JobPost> jobPost = jobPostService.getByPostId(jobPostId);
        Specification<JobRequest> spec = Specification.where(null);
        if(jobPost.isPresent()){
            spec = spec.and(JobRequestSpecifications.jobPost(jobPost.get()));
        }
        return jobRequestRepository.findAll(spec,pageable);
    }

    @Override
    public Page<JobRequest> getAllJobRequestsByUserId(Long userId, Pageable pageable) {

        Specification<JobRequest> spec = Specification.where(null);
        if(userId != null){
            spec = spec.and(JobRequestSpecifications.userId(userId));
        }
        return jobRequestRepository.findAll(spec,pageable);
    }

    @Override
    public JobRequest getJobRequestById(Long jobRequestId) {

        return jobRequestRepository.findById(jobRequestId)
                .orElseThrow(()-> new NoSuchElementException("Job Request not found with Id: "+ jobRequestId));
    }
}
