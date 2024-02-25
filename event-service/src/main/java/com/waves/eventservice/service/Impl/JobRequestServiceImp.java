package com.waves.eventservice.service.Impl;

import com.waves.eventservice.client.UserClient;
import com.waves.eventservice.model.Dto.JobRequestDto;
import com.waves.eventservice.model.Dto.UserDto;
import com.waves.eventservice.model.Enum.JobRequestStatus;
import com.waves.eventservice.model.Event;
import com.waves.eventservice.model.JobPost;
import com.waves.eventservice.model.JobRequest;
import com.waves.eventservice.repository.JobRequestRepository;
import com.waves.eventservice.service.EventService;
import com.waves.eventservice.service.JobPostService;
import com.waves.eventservice.service.JobRequestService;
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
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class JobRequestServiceImp implements JobRequestService {

    private final JobPostService jobPostService;

    private final JobRequestRepository jobRequestRepository;

    private final UserClient userClient;

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
    public boolean approveJobRequest(Long jobRequestId) {

        Optional<JobRequest> jobRequest = jobRequestRepository.findById(jobRequestId);
        // userId already for userId already exists
        if(jobRequest.isPresent()){
            UserDto userDto = userClient.getUserDetails(jobRequest.get().getUserId()).getBody();
            System.out.println(userDto.toString());
        }
        return false;
    }

    @Override
    public boolean rejectJobRequest(Long jobRequestId) {
        return false;
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
    public Optional<JobRequest> getByRequestDetailsById(Long jobRequestId) {

        Optional<JobRequest> jobRequest = jobRequestRepository.findById((jobRequestId));
        if(jobRequest.isPresent()){
            UserDto userDto = userClient.getUserDetails(jobRequest.get().getUserId()).getBody();
            System.out.println(userDto.toString());
        }
        return Optional.empty();
    }
}
