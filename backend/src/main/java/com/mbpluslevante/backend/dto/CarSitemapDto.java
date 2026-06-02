package com.mbpluslevante.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class CarSitemapDto {
    private String slug;
    private LocalDateTime lastModified;
}
