package com.mbpluslevante.backend.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService
{
    String upload(MultipartFile file);
}
