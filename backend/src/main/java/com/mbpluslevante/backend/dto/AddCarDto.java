package com.mbpluslevante.backend.dto;

import com.mbpluslevante.backend.model.enums.BodyType;
import com.mbpluslevante.backend.model.enums.FuelType;
import com.mbpluslevante.backend.model.enums.Transmission;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@NoArgsConstructor
public class AddCarDto
{
    @NotNull public Long brandId;
    public BodyType bodyType;
    public String model;
    @Positive public int year;
    public int mileageKm;
    public FuelType fuelType;
    public Transmission transmission;
    public String engine;
    public int powerHp;
    public String description;

    @Min(0)
    @NotNull
    public int price;
}
