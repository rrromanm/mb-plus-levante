package com.mbpluslevante.backend.controller;

import com.mbpluslevante.backend.dto.AdminCreateBookingDto;
import com.mbpluslevante.backend.dto.BookedRangeDto;
import com.mbpluslevante.backend.dto.BookingDto;
import com.mbpluslevante.backend.dto.CreateBookingDto;
import com.mbpluslevante.backend.model.enums.BookingStatus;
import com.mbpluslevante.backend.service.BookingService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "RentalBookingController")
public class RentalBookingController {

    private final BookingService bookingService;

    public RentalBookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/cars/rentals/{carId}/bookedDates")
    public List<BookedRangeDto> getBookedDates(@PathVariable Long carId) {
        return bookingService.getBookedDates(carId);
    }

    @PostMapping("/cars/rentals/{carId}/bookings")
    @ResponseStatus(HttpStatus.CREATED)
    public void createBooking(@PathVariable Long carId, @Valid @RequestBody CreateBookingDto dto) {
        bookingService.createBooking(carId, dto);
    }

    @PostMapping("/admin/rentalBookings")
    @ResponseStatus(HttpStatus.CREATED)
    public void createAdminBooking(@Valid @RequestBody AdminCreateBookingDto dto) {
        bookingService.createAdminBooking(dto);
    }

    @GetMapping("/admin/rentalBookings")
    public List<BookingDto> getBookings(@RequestParam(required = false) Long carId,
                                        @RequestParam(required = false) BookingStatus status) {
        return bookingService.findBookings(carId, status);
    }

    @PatchMapping("/admin/rentalBookings/{id}/status")
    public void updateStatus(@PathVariable Long id, @RequestParam BookingStatus status) {
        bookingService.updateStatus(id, status);
    }

    @DeleteMapping("/admin/rentalBookings/{id}")
    public void deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
    }
}
