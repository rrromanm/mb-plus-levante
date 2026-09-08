package com.mbpluslevante.backend.dto;

import com.mbpluslevante.backend.model.enums.BookingStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record BookingDto(
        Long id,
        Long carId,
        String car,
        String carImage,
        LocalDate startDate,
        LocalDate endDate,
        BookingStatus status,
        String customerName,
        String customerPhone,
        String customerEmail,
        String notes,
        LocalDateTime createdAt
) {}
