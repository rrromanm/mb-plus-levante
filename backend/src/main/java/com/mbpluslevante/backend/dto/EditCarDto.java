package com.mbpluslevante.backend.dto;

import com.mbpluslevante.backend.model.enums.BodyType;
import com.mbpluslevante.backend.model.enums.FuelType;
import com.mbpluslevante.backend.model.enums.Transmission;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EditCarDto {

    @NotNull
    private Long brandId;
    @NotNull
    private BodyType bodyType;
    @NotNull
    private String model;
    @NotNull
    private Integer year;
    @NotNull
    @Min(0)
    private Integer mileageKm;
    @NotNull
    private FuelType fuelType;
    @NotNull
    private Transmission transmission;
    private String engine;
    @Min(0)
    private Integer powerHp;
    @Size(max = 800)
    private String description;
    @NotNull
    @Positive
    private Integer price;
}
