package com.mbpluslevante.backend.dto;

import com.mbpluslevante.backend.model.enums.FuelType;
import com.mbpluslevante.backend.model.enums.Transmission;

import java.time.LocalDateTime;

public record RentalCarDto(
        Long id,
        String brand,
        String model,
        Integer year,
        Integer mileageKm,
        String slug,
        String mainImageUrl,
        FuelType fuelType,
        Transmission transmission,
        Integer powerHp,
        boolean featured,
        LocalDateTime createdAt,
        Integer pricePerDay,
        Integer pricePerMonth,
        boolean active
) {}
