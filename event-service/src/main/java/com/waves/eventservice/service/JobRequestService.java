package com.waves.eventservice.service;

import com.waves.eventservice.model.JobRequest;

import java.util.List;
import java.util.Optional;

public interface JobRequestService {

    JobRequest applyForJob(Long userId,Long eventId);

    boolean approveJobRequest(Long jobRequestId);

    boolean rejectJobRequest(Long jobRequestId);

    JobRequest updateJobRequest(Long jobRequestId);

    List<JobRequest> getAllJobRequests();

    Optional<JobRequest> getByRequestId(Long jobRequestId);
}
