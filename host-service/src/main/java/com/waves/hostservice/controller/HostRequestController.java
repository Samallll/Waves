package com.waves.hostservice.controller;

import com.waves.hostservice.model.HostRequest;
import com.waves.hostservice.model.HostRequestDto;
import com.waves.hostservice.services.HostRequestService;
import com.waves.hostservice.services.Impl.HostRequestServiceImp;
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

    @GetMapping("/{hostRequestId}")
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

    @GetMapping("/approve/{hostRequestId}")
    public ResponseEntity<String> approveHostRequest(@PathVariable Long hostRequestId){

        boolean hostCreation = hostRequestService.approveRequest(hostRequestId);
        if(hostCreation){
            return ResponseEntity.ok("Host Request Approved");
        }
        else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to approve the request");
        }
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
