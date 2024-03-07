package com.waves.chatservice.imageuploader;

import org.springframework.web.multipart.MultipartFile;

public interface ImageUploader {

    String uploadImage(MultipartFile file);

    byte[] viewImage(String key);

    String generateUniqueKey();

}
