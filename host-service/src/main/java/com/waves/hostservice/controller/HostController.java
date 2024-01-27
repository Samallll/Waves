package com.waves.hostservice.controller;

import com.waves.hostservice.model.Host;
import com.waves.hostservice.services.HostService;
import com.waves.hostservice.services.Impl.HostServiceImp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@EnableMethodSecurity
@RequestMapping("/api/v1/host")
public class HostController {

    private final HostService hostService;

    public HostController(HostServiceImp hostServiceImp) {
        this.hostService = hostServiceImp;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Host>> getAllHosts(){
        return ResponseEntity.ok(hostService.getAllHosts());
    }

    @GetMapping("/{hostId}")
    public ResponseEntity<Host> getHostById(@PathVariable Long hostId){

        Optional<Host> host = hostService.getHostById(hostId);
        return host.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{email}")
    public ResponseEntity<Host> getHostByEmailId(@PathVariable String emailId){
        Optional<Host> host = hostService.getHostByEmail(emailId);
        return host.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/lock/{hostId}")
    public ResponseEntity<String> lockHost(@PathVariable Long hostId){

        boolean locked = hostService.lockHost(hostId);
        if(locked){
            return ResponseEntity.ok("Host locked successfully");
        }
        else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to lock Host");
        }
    }

    @GetMapping("/unlock/{hostId}")
    public ResponseEntity<String> unlockHost(@PathVariable Long hostId){

        boolean locked = hostService.unlockHost(hostId);
        if(locked){
            return ResponseEntity.ok("Host unlocked successfully");
        }
        else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to unlock Host");
        }
    }

}
