package com.mbpluslevante.backend.dto;

import lombok.Data;

@Data
public class CarDto
{
    private Long id;
    private String brand;
    private String model;
    private Integer year;
    private Integer price;
    private Integer mileageKm;
    private String slug;
    private String mainImageUrl;
    private boolean isFeatured;
    private String description;

    public CarDto(Long id, String brand, String model, Integer year, Integer price, Integer mileageKm,
                  String slug, String mainImage, boolean isFeatured, String description) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.price = price;
        this.mileageKm = mileageKm;
        this.slug = slug;
        this.mainImageUrl = mainImage;
        this.isFeatured = isFeatured;
        this.description = description;
    }
}
