package com.waves.hostservice.services;

import com.waves.hostservice.model.Host;
import com.waves.hostservice.model.HostRequest;

import java.util.List;
import java.util.Optional;

public interface HostService {

    void createHost(HostRequest hostRequest);

    boolean lockHost(Long hostId);

    boolean unlockHost(Long hostId);

    List<Host> getAllHosts();

    Optional<Host> getHostById(Long hostId);

    Optional<Host> getHostByEmail(String emailId);

}
