package com.mbpluslevante.backend.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.mbpluslevante.backend.service.ImageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Service
public class ImageServiceImpl implements ImageService {
    private final Cloudinary cloudinary;

    @Value("${cloudinary.folder}")
    private String baseFolder;
    public ImageServiceImpl(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }
    @Override
    public String upload(MultipartFile file) {
        try {

            Map<String, Object> options = new HashMap<>();
            options.put("folder", baseFolder);

            Map<?, ?> result = cloudinary.uploader().upload(
                    file.getBytes(),
                    options
            );

            return result.get("public_id").toString();

        } catch (Exception e) {
            throw new RuntimeException("Cloudinary upload failed", e);
        }
    }

}
