package com.waves.eventservice.service;

import com.waves.eventservice.model.Event;
import com.waves.eventservice.model.JobPost;
import com.waves.eventservice.model.Organizer;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface JobPostService {

    JobPost createJobPost(JobPost jobPost);

    JobPost updateJobPost(Long jobPostId,JobPost jobPost);

    List<JobPost> getAllJobPost();

    Optional<JobPost> getByEvent(Event event);

    Set<Organizer> hiredUsersForEvent(Long jobPostId);

    Optional<JobPost> getByPostId(Long jobPostId);
}
