package com.waves.eventservice.service.Impl;

import com.waves.eventservice.model.JobRequest;
import com.waves.eventservice.service.JobRequestService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobRequestServiceImp implements JobRequestService {
    @Override
    public JobRequest applyForJob(Long userId, Long eventId) {
        return null;
    }

    @Override
    public boolean approveJobRequest(Long jobRequestId) {
        return false;
    }

    @Override
    public boolean rejectJobRequest(Long jobRequestId) {
        return false;
    }

    @Override
    public JobRequest updateJobRequest(Long jobRequestId) {
        return null;
    }

    @Override
    public List<JobRequest> getAllJobRequests() {
        return null;
    }

    @Override
    public Optional<JobRequest> getByRequestId(Long jobRequestId) {
        return Optional.empty();
    }
}
