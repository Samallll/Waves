package com.waves.eventservice.util;

import com.waves.eventservice.model.JobPost;
import com.waves.eventservice.model.JobRequest;
import org.springframework.data.jpa.domain.Specification;

public class JobRequestSpecifications {

    public static Specification<JobRequest> jobPost(JobPost jobPost){
        return ((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("jobPost"),jobPost));
    }

    public static Specification<JobRequest> userId(Long userId){
        return ((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("userId"),userId));
    }
}
