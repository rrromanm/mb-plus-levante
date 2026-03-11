package com.mbpluslevante.backend.dto;

import com.mbpluslevante.backend.model.enums.FuelType;
import com.mbpluslevante.backend.model.enums.Transmission;
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
    private FuelType fuelType;
    private Transmission transmission;
    private Integer powerHp;
    private boolean featured;

    public CarDto(Long id, String brand, String model, Integer year, Integer price, Integer mileageKm,
                  String slug, String mainImage, FuelType fuelType, Transmission transmission, Integer powerHp, boolean featured) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.price = price;
        this.mileageKm = mileageKm;
        this.slug = slug;
        this.mainImageUrl = mainImage;
        this.fuelType = fuelType;
        this.transmission = transmission;
        this.powerHp = powerHp;
        this.featured = featured;
    }
}
