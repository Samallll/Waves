package com.waves.hostservice.services;

import com.waves.hostservice.model.HostRequest;
import com.waves.hostservice.model.HostRequestDto;

import java.util.List;
import java.util.Optional;

public interface HostRequestService {

    HostRequest createHostRequest(HostRequest hostRequest);

    List<HostRequestDto> getAllRequests();

    Optional<HostRequestDto> getRequestById(Long hostRequestId);

    Optional<HostRequestDto> getRequestByUserId(Long userId);

    boolean approveRequest(Long hostRequestId);

    boolean disapproveRequest(Long hostRequestId);
}
