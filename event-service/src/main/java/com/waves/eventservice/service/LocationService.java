package com.waves.eventservice.service;

import com.waves.eventservice.model.Location;

import java.util.List;
import java.util.Optional;

public interface LocationService {

    List<Location> getAllLocations();

    Optional<Location> getByEventId(Long eventId);

    Optional<Location> getByLocationId(Long locationId);

    Location registerLocation(Location location);

    Location updateLocation(Long locationId,Location location);

}
