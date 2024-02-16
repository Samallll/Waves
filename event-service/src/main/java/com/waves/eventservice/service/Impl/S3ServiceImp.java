package com.waves.eventservice.service.Impl;

import com.waves.eventservice.service.S3Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.security.SecureRandom;

@Service
public class S3ServiceImp implements S3Service {

    private final S3Client s3Client;

    @Value("${aws.bucket.name}")
    private String bucketName;

    @Value("${aws.region}")
    private String awsRegion;

    public S3ServiceImp(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    @Override
    public String putObject(byte[] file){
        String key = generateUniqueKey();
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key("images/"+key)
                .build();
        s3Client.putObject(objectRequest, RequestBody.fromBytes(file));
        return key;
    }

    @Override
    public byte[] getObject(String key){
        GetObjectRequest objectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key("images/"+key)
                .build();

        ResponseInputStream<GetObjectResponse> res = s3Client.getObject(objectRequest);
        try {
            return  res.readAllBytes();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String generateUniqueKey() {
        SecureRandom random = new SecureRandom();
        byte[] randomBytes = new byte[16];
        random.nextBytes(randomBytes);

        StringBuilder sb = new StringBuilder();
        for (byte b : randomBytes) {
            sb.append(String.format("%02x", b));
        }
        long timestamp = System.currentTimeMillis();
        sb.append(timestamp);

        return sb.toString();
    }
}
