package com.waves.hostservice.controller;

import com.waves.hostservice.model.HostRequest;
import com.waves.hostservice.model.dto.EmailDto;
import com.waves.hostservice.model.dto.HostRequestDto;
import com.waves.hostservice.model.RequestStatus;
import com.waves.hostservice.producer.EmailProducer;
import com.waves.hostservice.services.HostRequestService;
import com.waves.hostservice.services.Impl.HostRequestServiceImp;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@EnableMethodSecurity
@RequestMapping("/api/v1/host/host-request")
public class HostRequestController {

    private final HostRequestService hostRequestService;

    public HostRequestController(HostRequestServiceImp hostRequestServiceImp) {
        this.hostRequestService = hostRequestServiceImp;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerHostRequest(@RequestBody HostRequest hostRequest) {
        try {
            HostRequest createdHostRequest = hostRequestService.createHostRequest(hostRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdHostRequest);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while processing the request.");
        }
    }

    @GetMapping("/all-requests")
    public ResponseEntity<List<HostRequestDto>> getAllRequests(){
        return ResponseEntity.ok(hostRequestService.getAllRequests());
    }

    @GetMapping("/all")
    public ResponseEntity<Page<HostRequestDto>> getUsersByPaginationAndSearch(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String searchQuery) {

        Pageable pageable = PageRequest.of(page, size);
        Page<HostRequestDto> usersPage = hostRequestService.getUsersByPaginationAndSearch(pageable, searchQuery);
        return ResponseEntity.ok(usersPage);
    }

    @GetMapping("/details/{hostRequestId}")
    public ResponseEntity<HostRequestDto> getAllRequestsById(@PathVariable Long hostRequestId) {

        Optional<HostRequestDto> hostRequestOptional = hostRequestService.getRequestById(hostRequestId);
        return hostRequestOptional
                .map(hostRequest -> ResponseEntity.ok(hostRequest))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{userId}")
    public ResponseEntity<HostRequestDto> getAllRequestsByUserId(@PathVariable Long userId) {
        Optional<HostRequestDto> hostRequestOptional = hostRequestService.getRequestByUserId(userId);
        return hostRequestOptional
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/")
    public ResponseEntity<HostRequestDto> checkForHostRequest(@RequestParam Long userId,
                                       @RequestParam RequestStatus status){

        Optional<HostRequestDto> isUnique = hostRequestService.fidHostRequestByIdAndStatus(userId,status);
        return isUnique.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/approve/{hostRequestId}")
    public ResponseEntity<String> approveHostRequest(@PathVariable Long hostRequestId){

//        boolean hostCreation = hostRequestService.approveRequest(hostRequestId);
//        if(hostCreation){
//            return ResponseEntity.ok("Host Request Approved");
//        }
//        else{
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to approve the request");
//        }
        return ResponseEntity.ok("Host Request Approved");
    }

    @GetMapping("/disapprove/{hostRequestId}")
    public ResponseEntity<String> disapproveHostRequest(@PathVariable Long hostRequestId){

        boolean hostCreation = hostRequestService.disapproveRequest(hostRequestId);
        if(hostCreation){
            return ResponseEntity.ok("Host Request Disapproved");
        }
        else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to disapprove the request");
        }
    }

}
