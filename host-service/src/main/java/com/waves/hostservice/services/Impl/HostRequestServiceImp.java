package com.waves.hostservice.services.Impl;

import com.waves.hostservice.model.dto.EmailDto;
import com.waves.hostservice.model.dto.HostRequestDto;
import com.waves.hostservice.model.RequestStatus;
import com.waves.hostservice.producer.EmailProducer;
import com.waves.hostservice.repository.HostRequestRepository;
import com.waves.hostservice.model.HostRequest;
import com.waves.hostservice.services.HostRequestService;
import com.waves.hostservice.services.HostService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class HostRequestServiceImp implements HostRequestService {

    private final HostRequestRepository hostRequestRepository;
    private final HostService hostService;

    private final EmailProducer emailProducer;

    public HostRequestServiceImp(HostRequestRepository hostRequestRepository, HostServiceImp hostServiceImp, EmailProducer emailProducer) {
        this.hostRequestRepository = hostRequestRepository;
        this.hostService = hostServiceImp;
        this.emailProducer = emailProducer;
    }

    public HostRequest createHostRequest(HostRequest hostRequest) {
        log.debug("Registering Host Request");
        hostRequest.setAadharNumber(encoder().encode(hostRequest.getAadharNumber()));
        return hostRequestRepository.save(hostRequest);
    }

    public List<HostRequestDto> getAllRequests() {
        List<HostRequest> hostRequests = hostRequestRepository.findAll();
        return hostRequests.stream()
                .map(this::convertToDto)
                .toList();
    }

    public Optional<HostRequestDto> getRequestById(Long hostRequestId) {
        Optional<HostRequest> hostRequestOptional = hostRequestRepository.findById(hostRequestId);
        return hostRequestOptional.map(this::convertToDto);
    }

    public Optional<HostRequestDto> getRequestByUserId(Long userId) {

        Optional<HostRequest> hostRequestDtoOptional = hostRequestRepository.findByUserId(userId);
        return hostRequestDtoOptional.map(this::convertToDto);
    }


    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    public boolean approveRequest(Long hostRequestId) {

        Optional<HostRequest> hostRequest = hostRequestRepository.findById(hostRequestId);
        if(hostRequest.isPresent()){
            HostRequest request = hostRequest.get();
            hostService.createHost(request);
            request.setStatus(RequestStatus.APPROVED);
            // make a call to the broker to send the data for updating the user role to host
            EmailDto welcomeMail = new EmailDto();
            welcomeMail.setToList(request.getEmailId());
            welcomeMail.setSubject("Welcome to the Crowdcraft Host Community!");
            welcomeMail.setBody("""
                Hi [Host Name],
                
                We're thrilled to announce that your host application has been approved! You're now officially part of the Crowdcraft family, and we can't wait to see the amazing events you'll bring to life.
                
                Here are some next steps to get you started:
                
                Create your first event listing: Log in to your Crowdcraft dashboard and start crafting your event page. Share all the exciting details to attract attendees and organizers.
                Browse our resources: Check out our helpful guides and tips for hosting successful events. We're here to support you every step of the way.
                Join our community: Connect with other hosts, organizers, and attendees in our vibrant community forums. Share ideas, collaborate, and create unforgettable experiences together.
                
                We're excited to see what you create! ✨
                
                Happy hosting,
                The Crowdcraft Team
            """);
            emailProducer.sendEmailTask(welcomeMail);
            hostRequestRepository.save(request);
            log.info("Host created successfully");
            return true;
        }
        log.debug("Host creation failed");
        return false;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public boolean disapproveRequest(Long hostRequestId) {

        Optional<HostRequest> hostRequest = hostRequestRepository.findById(hostRequestId);
        if(hostRequest.isPresent()){
            hostRequest.get().setStatus(RequestStatus.REJECTED);
            hostRequestRepository.save(hostRequest.get());
            return true;
        }
        return false;
    }

    @Override
    public Optional<HostRequestDto> fidHostRequestByIdAndStatus(Long userId, RequestStatus status) {
        return hostRequestRepository.findByUserIdAndStatus(userId,status)
                .map(this::convertToDto);
    }

    @Override
    public Page<HostRequestDto> getUsersByPaginationAndSearch(Pageable pageable, String searchQuery) {

        Page<HostRequest> result;
        if(searchQuery != null && !searchQuery.isEmpty()){
            result = hostRequestRepository.findByEmailIdContaining(searchQuery,pageable);
        }
        else{
            result = hostRequestRepository.findAll(pageable);
        }
        List<HostRequestDto> requests = result.stream()
                .map(this::convertToDto)
                .toList();
        log.debug("Converted paginated User list into UserDtos");
        return new PageImpl<>(requests, pageable, result.getTotalElements());
    }

    private HostRequestDto convertToDto(HostRequest hostRequest) {
        return new HostRequestDto(
                hostRequest.getHostRequestId(),
                hostRequest.getUserId(),
                hostRequest.getEmailId(),
                hostRequest.getBankId(),
                hostRequest.getStatus(),
                hostRequest.getDesignation(),
                hostRequest.getAbout()
        );
    }

    @Bean
    public PasswordEncoder encoder(){
        return new BCryptPasswordEncoder();
    }
}
