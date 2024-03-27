package com.waves.eventservice.controller;

import com.waves.eventservice.model.JobPost;
import com.waves.eventservice.service.JobPostService;
import com.waves.eventservice.service.SharedService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/event/job-post")
@EnableMethodSecurity
public class JobPostController {

    private final JobPostService jobPostService;

    private final SharedService sharedService;

    public JobPostController(JobPostService jobPostService, SharedService sharedService) {
        this.jobPostService = jobPostService;
        this.sharedService = sharedService;
    }

    @PreAuthorize("hasAnyRole('HOST','ADMIN','USER')")
    @GetMapping("/all")
    public ResponseEntity<Page<JobPost>> getJobPostsForHost(
            @RequestParam(required = true) Long postedByUserId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String searchQuery,
            @RequestParam(required = false) Boolean isActive
    ){

        Pageable pageable = PageRequest.of(page,size);
        Page<JobPost> jobPostDetails = jobPostService.getJobPostForHost(isActive,postedByUserId,page,size,searchQuery,pageable);
        return ResponseEntity.ok(jobPostDetails);
    }

    @PreAuthorize("hasAnyRole('HOST','ADMIN','USER')")
    @GetMapping("/{jobPostId}")
    public ResponseEntity<JobPost> getJobPost(@PathVariable Long jobPostId){

        Optional<JobPost> jobPost = jobPostService.getByPostId(jobPostId);
        return jobPost.map(ResponseEntity::ok).orElseGet(()->ResponseEntity.notFound().build());
    }

    @PreAuthorize("hasAnyRole('HOST','ADMIN','USER')")
    @GetMapping("/by-eventId/{eventId}")
    public ResponseEntity<JobPost> getJobPostByEventId(@PathVariable Long eventId){

        Optional<JobPost> jobPost = sharedService.getJobPostByEventId(eventId);
        return jobPost.map(ResponseEntity::ok).orElseGet(()->ResponseEntity.notFound().build());
    }
}
