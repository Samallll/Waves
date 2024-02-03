package com.waves.hostservice.services;

import com.waves.hostservice.model.HostRequest;
import com.waves.hostservice.model.dto.HostRequestDto;
import com.waves.hostservice.model.RequestStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface HostRequestService {

    HostRequest createHostRequest(HostRequest hostRequest);

    List<HostRequestDto> getAllRequests();

    Optional<HostRequestDto> getRequestById(Long hostRequestId);

    Optional<HostRequestDto> getRequestByUserId(Long userId);

    boolean approveRequest(Long hostRequestId);

    boolean disapproveRequest(Long hostRequestId);

    Optional<HostRequestDto> fidHostRequestByIdAndStatus(Long userId, RequestStatus status);

    Page<HostRequestDto> getUsersByPaginationAndSearch(Pageable pageable, String searchQuery);
}
