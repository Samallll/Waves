package com.waves.eventservice.service.Impl;

import com.waves.eventservice.model.Location;
import com.waves.eventservice.repository.LocationRepository;
import com.waves.eventservice.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LocationServiceImp implements LocationService {

    private final LocationRepository locationRepository;

    @Override
    public List<Location> getAllLocations() {
        return null;
    }

    @Override
    public Optional<Location> getByEventId(Long eventId) {
        return Optional.empty();
    }

    @Override
    public Optional<Location> getByLocationId(Long locationId) {
        return Optional.empty();
    }

    @Override
    public Location registerLocation(Location location) {
        return locationRepository.save(location);
    }

    @Override
    public Location updateLocation(Location location) {
        return null;
    }
}
