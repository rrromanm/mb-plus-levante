package com.mbpluslevante.backend.dto;

import com.mbpluslevante.backend.model.enums.BodyType;
import com.mbpluslevante.backend.model.enums.FuelType;
import com.mbpluslevante.backend.model.enums.Transmission;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EditCarDto {

    private Long brandId;
    private BodyType bodyType;
    private String model;
    private Integer year;
    private Integer mileageKm;
    private FuelType fuelType;
    private Transmission transmission;
    private String engine;
    private Integer powerHp;
    private String description;
    private Integer price;
}
