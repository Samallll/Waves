package com.waves.eventservice.controller;

import brave.Response;
import com.waves.eventservice.model.Dto.JobRequestDto;
import com.waves.eventservice.model.JobRequest;
import com.waves.eventservice.service.JobRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/event/job-request")
public class JobRequestController {

    private final JobRequestService jobRequestService;

    @PostMapping("/register/{jobPostId}")
    public ResponseEntity<JobRequest> registerJobRequest(@Valid @RequestBody JobRequestDto jobRequestDto,
                                                         @PathVariable Long jobPostId,
                                                         BindingResult result){

        if (result.hasErrors()) {
            return ResponseEntity.notFound().build();
        }

        JobRequest savedRequest = jobRequestService.applyForJob(jobPostId,jobRequestDto);
        if(savedRequest!=null){
            return ResponseEntity.ok(savedRequest);
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{jobRequestId}")
    public ResponseEntity<JobRequest> getJobRequestDetails(@PathVariable Long jobRequestId){

        JobRequest jobRequest = jobRequestService.getJobRequestById(jobRequestId);
        return ResponseEntity.ok(jobRequest);
    }

    @GetMapping("/by-job-post")
    public ResponseEntity<Page<JobRequest>> getJobRequestsByJobPost(@RequestParam(required = true) Long jobPostId,
                                                                    @RequestParam(defaultValue = "0") int page,
                                                                    @RequestParam(defaultValue = "10") int size){

        Pageable pageable = PageRequest.of(page,size);
        Page<JobRequest> jobRequestsPage = jobRequestService.getAllJobRequestsByJobPost(jobPostId,pageable);
        return ResponseEntity.ok(jobRequestsPage);
    }

    @GetMapping("/by-userId")
    public ResponseEntity<Page<JobRequest>> getJobRequestByUserId(@RequestParam Long userId,
                                                                  @RequestParam(defaultValue = "0")int page,
                                                                  @RequestParam(defaultValue = "10")int size){
        Pageable pageable = PageRequest.of(page,size);
        Page<JobRequest> jobRequestPage = jobRequestService.getAllJobRequestsByUserId(userId,pageable);
        return ResponseEntity.ok(jobRequestPage);
    }

    @GetMapping("/approve/{jobRequestId}")
    public ResponseEntity<JobRequest> approveJobRequest(@PathVariable Long jobRequestId) {
        JobRequest jobRequest = jobRequestService.approveJobRequest(jobRequestId);
        return ResponseEntity.ok(jobRequest);
    }

    @PostMapping("/reject/{jobRequestId}")
    public ResponseEntity<JobRequest> rejectJobRequest(@PathVariable Long jobRequestId,
                                                       @RequestBody Map<String, Object> payload) {
        String reason = (String) payload.get("reason");
        JobRequest jobRequest = jobRequestService.rejectJobRequest(jobRequestId,reason);
        return ResponseEntity.ok(jobRequest);
    }
}
