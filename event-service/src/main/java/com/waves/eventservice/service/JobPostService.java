package com.waves.eventservice.service;

import com.waves.eventservice.model.Event;
import com.waves.eventservice.model.JobPost;
import com.waves.eventservice.model.Organizer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface JobPostService {

    JobPost createJobPost(JobPost jobPost);

    JobPost updateJobPost(Long jobPostId,JobPost jobPost);

    Set<Organizer> hiredUsersForEvent(Long jobPostId);

    Optional<JobPost> getByPostId(Long jobPostId);

    Page<JobPost> getJobPostForHost(Boolean isActive,Long hostedByUserId, int page, int size, String searchQuery, Pageable pageable);

}
