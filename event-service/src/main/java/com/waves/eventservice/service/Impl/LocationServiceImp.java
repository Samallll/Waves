package com.waves.eventservice.service.Impl;

import com.waves.eventservice.model.Location;
import com.waves.eventservice.repository.LocationRepository;
import com.waves.eventservice.service.LocationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
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
    public Location updateLocation(Long locationId, Location location) {
        Optional<Location> existingLocation = locationRepository.findById(locationId);
        if (existingLocation.isPresent()) {
            Location updatedLocation = existingLocation.get();
            updatedLocation.setEvent(location.getEvent());
            updatedLocation.setCity(location.getCity());
            updatedLocation.setCountry(location.getCountry());
            updatedLocation.setState(location.getState());
            updatedLocation.setStreetAddress(location.getStreetAddress());
            log.debug("Location data updated successfully");
            return locationRepository.save(updatedLocation);
        }
        log.debug("Failed to udpate location");
        return null;
    }
}
