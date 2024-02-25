package com.waves.eventservice.util;

import com.waves.eventservice.model.Event;
import com.waves.eventservice.model.JobPost;
import org.springframework.data.jpa.domain.Specification;

public class JobPostSpecifications {

    public static Specification<JobPost> search(String jobName){
        return ((root, query, criteriaBuilder) ->
                criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("jobName")),
                        "%"+jobName.toLowerCase()+"%"
                ));
    }

    public static Specification<JobPost> postedByUserId(Long postedByUserId){
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("postedByUserId"),postedByUserId);
    }

    public static Specification<JobPost> event(Event event){
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("event"),event);
    }

    public static Specification<JobPost> isActive(boolean isActive){
        return ((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("isActive"),isActive));
    }
}
