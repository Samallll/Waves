package com.waves.eventservice.service;

import com.waves.eventservice.model.Location;

import java.util.List;
import java.util.Optional;

public interface LocationService {

    Location registerLocation(Location location);

    Location updateLocation(Long locationId,Location location);

}
