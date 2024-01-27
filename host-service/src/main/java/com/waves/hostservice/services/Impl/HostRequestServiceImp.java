package com.waves.hostservice.services.Impl;

import com.waves.hostservice.model.HostRequestDto;
import com.waves.hostservice.repository.HostRequestRepository;
import com.waves.hostservice.model.HostRequest;
import com.waves.hostservice.services.HostRequestService;
import com.waves.hostservice.services.HostService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class HostRequestServiceImp implements HostRequestService {

    private final HostRequestRepository hostRequestRepository;
    private final PasswordEncoder passwordEncoder;
    private final HostService hostService;

    public HostRequestServiceImp(HostRequestRepository hostRequestRepository, PasswordEncoder passwordEncoder, HostServiceImp hostServiceImp) {
        this.hostRequestRepository = hostRequestRepository;
        this.passwordEncoder = passwordEncoder;
        this.hostService = hostServiceImp;
    }

    public HostRequest createHostRequest(HostRequest hostRequest) {
        log.debug("Registering Host Request");
        hostRequest.setAadharNumber(passwordEncoder.encode(hostRequest.getAadharNumber()));
        return hostRequestRepository.save(hostRequest);
    }

    public List<HostRequestDto> getAllRequests() {
        List<HostRequest> hostRequests = hostRequestRepository.findAll();
        return hostRequests.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
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
            hostService.createHost(hostRequest.get());
            hostRequest.get().setApproved(true);
            // make a call to the broker to send the data for updating the user role to host
            hostRequestRepository.save(hostRequest.get());
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
            hostRequest.get().setApproved(false);
            hostRequestRepository.save(hostRequest.get());
            return true;
        }
        return false;
    }

    private HostRequestDto convertToDto(HostRequest hostRequest) {
        return new HostRequestDto(
                hostRequest.getHostRequestId(),
                hostRequest.getUserId(),
                hostRequest.getEmailId(),
                hostRequest.getBankDetailId(),
                hostRequest.isApproved()
        );
    }
}
