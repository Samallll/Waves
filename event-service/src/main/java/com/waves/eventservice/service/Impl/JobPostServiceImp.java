package com.waves.eventservice.service.Impl;

import com.waves.eventservice.model.Event;
import com.waves.eventservice.model.JobPost;
import com.waves.eventservice.model.Organizer;
import com.waves.eventservice.repository.JobPostRepository;
import com.waves.eventservice.service.JobPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class JobPostServiceImp implements JobPostService {

    private final JobPostRepository jobPostRepository;

    @Override
    public JobPost createJobPost(JobPost jobPost) {
        return jobPostRepository.save(jobPost);
    }

    @Override
    public JobPost updateJobPost(Long jobPostId) {
        return null;
    }

    @Override
    public List<JobPost> getAllJobPost() {
        return jobPostRepository.findAll();
    }

    @Override
    public Optional<JobPost> getByEvent(Event event) {
        return Optional.empty();
    }

    @Override
    public Set<Organizer> hiredUsersForEvent(Long jobPostId) {
        return null;
    }

    @Override
    public Optional<JobPost> getByPostId(Long jobPostId) {
        return Optional.empty();
    }
}
