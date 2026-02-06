package com.mbpluslevante.backend.dto;

import lombok.Data;

@Data
public class FeaturedCarsDto {

    private String brand;
    private String model;
    private Integer year;
    private Integer price;
    private Integer mileageKm;
    private String slug;
    private String mainImageUrl;

    public FeaturedCarsDto(
            String brand,
            String model,
            Integer year,
            Integer price,
            Integer mileageKm,
            String slug,
            String mainImageUrl
    ) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.price = price;
        this.mileageKm = mileageKm;
        this.slug = slug;
        this.mainImageUrl = mainImageUrl;
    }
}
