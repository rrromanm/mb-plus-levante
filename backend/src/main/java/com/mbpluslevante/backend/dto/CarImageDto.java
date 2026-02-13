package com.mbpluslevante.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CarImageDto {
    private String imageUrl;
    private boolean primaryImage;
    private Integer orderIndex;
}
