package com.waves.hostservice.services.Impl;

import com.waves.hostservice.repository.HostRepository;
import com.waves.hostservice.model.Host;
import com.waves.hostservice.model.HostRequest;
import com.waves.hostservice.services.HostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class HostServiceImp implements HostService {

    private final HostRepository hostRepository;

    public HostServiceImp(HostRepository hostRepository) {
        this.hostRepository = hostRepository;
    }

    @Override
    public void createHost(HostRequest hostRequest) {

        Host newHost = new Host(
                hostRequest.getUserId(),
                hostRequest.getEmailId()
        );
        newHost.setLocked(false);
        newHost.setHostRequest(hostRequest);
        hostRepository.save(newHost);
    }

    @Override
    public boolean lockHost(Long hostId) {
        Optional<Host> host = hostRepository.findById(hostId);
        if(host.isPresent()){
            host.get().setLocked(true);
            log.info("Host locked successfully");
            hostRepository.save(host.get());
        }
        log.debug("Couldn't find out host");
        return false;
    }

    @Override
    public boolean unlockHost(Long hostId) {
        Optional<Host> host = hostRepository.findById(hostId);
        if(host.isPresent()){
            host.get().setLocked(false);
            log.info("Host unlocked successfully");
            hostRepository.save(host.get());
        }
        log.debug("Couldn't find out host");
        return false;
    }

    @Override
    public List<Host> getAllHosts() {
        return hostRepository.findAll();
    }

    @Override
    public Optional<Host> getHostById(Long hostId) {
        return hostRepository.findById(hostId);
    }

    @Override
    public Optional<Host> getHostByEmail(String emailId) {
        return hostRepository.findByEmailId(emailId);
    }


}
