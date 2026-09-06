package com.mbpluslevante.backend.dto;

import com.mbpluslevante.backend.model.enums.FuelType;
import com.mbpluslevante.backend.model.enums.Transmission;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EditRentalCarDto
{
    @NotNull public Long brandId;
    @NotNull public String model;
    @Positive public int year;
    @Min(0) public int mileageKm;
    public FuelType fuelType;
    public Transmission transmission;

    @Min(0)
    @NotNull
    public Integer pricePerDay;
    @Min(0)
    public Integer pricePerMonth;
    public boolean active = true;
}
