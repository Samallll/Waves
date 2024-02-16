package com.waves.eventservice.service;

public interface S3Service {

    String putObject(byte[] file);

    byte[] getObject(String key);

    String generateUniqueKey();

}
