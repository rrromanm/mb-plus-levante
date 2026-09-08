package com.mbpluslevante.backend.dto;

import com.mbpluslevante.backend.model.enums.BookingStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record AdminCreateBookingDto(
        @NotNull Long carId,
        @NotNull LocalDate startDate,
        @NotNull LocalDate endDate,
        @NotBlank @Size(max = 100) String customerName,
        @NotBlank @Size(max = 30) String customerPhone,
        @Email @Size(max = 255) String customerEmail,
        @Size(max = 1000) String notes,
        BookingStatus status // defaults to CONFIRMED when null
) {}
