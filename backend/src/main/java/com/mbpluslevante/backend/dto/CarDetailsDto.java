package com.mbpluslevante.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class CarDetailsDto
{
    private String brand;
    private String model;
    private Integer year;
    private Integer price;
    private Integer mileageKm;
    private String slug;
    private List<CarImageDto> images;
    private String description;

    public CarDetailsDto(String brand, String model, Integer year, Integer price, Integer mileageKm,
                  String slug, List<CarImageDto> images, String description) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.price = price;
        this.mileageKm = mileageKm;
        this.slug = slug;
        this.images = images;
        this.description = description;
    }
}
