package com.mbpluslevante.backend.dto;

import com.mbpluslevante.backend.model.enums.BodyType;
import com.mbpluslevante.backend.model.enums.FuelType;
import com.mbpluslevante.backend.model.enums.Transmission;
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
    private FuelType fuelType;
    private Transmission transmission;
    private String engine;
    private int powerHp;
    private BodyType bodyType;

    public CarDetailsDto(String brand, String model, Integer year, Integer price, Integer mileageKm,
                  String slug, List<CarImageDto> images, String description, FuelType fuelType, Transmission transmission,
                         String engine, int powerHp, BodyType bodyType) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.price = price;
        this.mileageKm = mileageKm;
        this.slug = slug;
        this.images = images;
        this.description = description;
        this.fuelType = fuelType;
        this.transmission = transmission;
        this.engine = engine;
        this.powerHp = powerHp;
        this.bodyType = bodyType;
    }
}
