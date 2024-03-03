package com.waves.eventservice.service.Impl;

import com.waves.eventservice.model.Event;
import com.waves.eventservice.model.JobPost;
import com.waves.eventservice.model.Organizer;
import com.waves.eventservice.repository.JobPostRepository;
import com.waves.eventservice.service.EventService;
import com.waves.eventservice.service.JobPostService;
import com.waves.eventservice.util.JobPostSpecifications;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.BooleanUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;

@Service
@Slf4j
@RequiredArgsConstructor
public class JobPostServiceImp implements JobPostService {

    private final JobPostRepository jobPostRepository;

    @Override
    public JobPost createJobPost(JobPost jobPost) {
        return jobPostRepository.save(jobPost);
    }

    @Override
    public JobPost updateJobPost(Long jobPostId,JobPost jobPost) {

        Optional<JobPost> updatedJobPost = jobPostRepository.findById(jobPostId);
        if(updatedJobPost.isPresent()){
            JobPost editedJobPost = updatedJobPost.get();
            editedJobPost.setJobDescription(jobPost.getJobDescription());
            editedJobPost.setJobName(jobPost.getJobName());
            editedJobPost.setActive(jobPost.isActive());
            editedJobPost.setOpenPositions(jobPost.getOpenPositions());
            editedJobPost.setSalary(jobPost.getSalary());
            editedJobPost.setSkillsRequired(jobPost.getSkillsRequired());
            editedJobPost.setTermsAndConditions(jobPost.getTermsAndConditions());
            return jobPostRepository.save(editedJobPost);
        }
        log.debug("JobPost updated successfully");
        return null;
    }


    @Override
    public Set<Organizer> hiredUsersForEvent(Long jobPostId) {
        return jobPostRepository.findById(jobPostId).map(JobPost::getOrganizers).orElseThrow(
                ()-> new IllegalStateException("Job post not found with ID: " + jobPostId)
        );
    }

    @Override
    public void addOrganizer(Long jobPostId, Organizer organizer) {

        JobPost jobPost = jobPostRepository.findById(jobPostId).orElseThrow(
                () -> new NoSuchElementException("Job Post not found with ID: " + jobPostId)
        );

        jobPost.getOrganizers().add(organizer);
        jobPostRepository.save(jobPost);

    }

    @Override
    public Optional<JobPost> getByPostId(Long jobPostId) {
        return jobPostRepository.findById(jobPostId);
    }

    @Override
    public Page<JobPost> getJobPostForHost(Boolean isActive,Long postedByUserId, int page, int size, String searchQuery, Pageable pageable) {

        Specification<JobPost> spec = Specification.where(null);
        if(!StringUtils.isEmpty(searchQuery)){
            spec = JobPostSpecifications.search(searchQuery);
        }
        if(postedByUserId != null){
            spec = JobPostSpecifications.postedByUserId(postedByUserId);
        }
        Page<JobPost> jobPosts = jobPostRepository.findAll(spec,pageable);

        if(isActive!=null){
            List<JobPost> list = jobPosts.getContent().stream()
                    .filter(jobPost -> jobPost.isActive() == isActive)
                    .toList();
            jobPosts = new PageImpl<>(list,pageable,list.size());
        }
        log.debug("Job Post Details fetched from repository");
        return jobPosts;
    }
}
