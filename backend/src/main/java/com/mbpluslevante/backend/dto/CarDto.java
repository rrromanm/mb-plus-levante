package com.mbpluslevante.backend.dto;

import lombok.Data;

@Data
public class CarDto
{
    private String brand;
    private String model;
    private Integer year;
    private Integer price;
    private Integer mileageKm;
    private String slug;
    private String mainImageUrl;

    public CarDto(String brand, String model, Integer year, Integer price, Integer mileageKm, String slug, String mainImage){
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.price = price;
        this.mileageKm = mileageKm;
        this.slug = slug;
        this.mainImageUrl = mainImage;
    }
}
