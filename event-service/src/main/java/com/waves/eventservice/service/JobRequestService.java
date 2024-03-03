package com.waves.eventservice.service;

import com.waves.eventservice.model.Dto.JobRequestDto;
import com.waves.eventservice.model.JobRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface JobRequestService {

    JobRequest applyForJob(Long jobPostId, JobRequestDto jobRequestDto);

    JobRequest approveJobRequest(Long jobRequestId);

    JobRequest rejectJobRequest(Long jobRequestId,String reason);

    Page<JobRequest> getAllJobRequestsByJobPost(Long jobPostId, Pageable pageable);

    Page<JobRequest> getAllJobRequestsByUserId(Long userId, Pageable pageable);

    JobRequest getJobRequestById(Long jobRequestId);
}
