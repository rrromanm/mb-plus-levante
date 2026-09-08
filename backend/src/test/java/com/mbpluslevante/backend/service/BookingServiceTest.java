package com.mbpluslevante.backend.service;

import com.mbpluslevante.backend.dto.AdminCreateBookingDto;
import com.mbpluslevante.backend.dto.CreateBookingDto;
import com.mbpluslevante.backend.model.Brand;
import com.mbpluslevante.backend.model.Car;
import com.mbpluslevante.backend.model.CarRental;
import com.mbpluslevante.backend.model.CarRentalBooking;
import com.mbpluslevante.backend.model.enums.BookingStatus;
import com.mbpluslevante.backend.repository.CarRentalBookingRepository;
import com.mbpluslevante.backend.repository.CarRentalRepository;
import org.junit.jupiter.api.Test;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class BookingServiceTest {

    private final CarRentalBookingRepository bookingRepository = mock(CarRentalBookingRepository.class);
    private final CarRentalRepository carRentalRepository = mock(CarRentalRepository.class);
    private final BookingService service =
            new BookingService(bookingRepository, carRentalRepository);

    private final LocalDate start = LocalDate.now().plusDays(1);
    private final LocalDate end = LocalDate.now().plusDays(3);

    private CreateBookingDto dto() {
        return new CreateBookingDto(start, end, "John", "+34600000000", "john@test.com", null);
    }

    private CarRental rental() {
        Brand brand = new Brand();
        brand.setName("BMW");
        Car car = new Car();
        car.setId(1L);
        car.setBrand(brand);
        car.setModel("320i");
        CarRental rental = new CarRental();
        rental.setCar(car);
        rental.setActive(true);
        return rental;
    }

    @Test
    void overlappingConfirmedRejectsBooking() {
        when(carRentalRepository.findByCarId(1L)).thenReturn(Optional.of(rental()));
        when(bookingRepository.findOverlapping(eq(1L), eq(BookingStatus.CONFIRMED), any(), any(), anyLong()))
                .thenReturn(List.of(new CarRentalBooking()));
        assertThrows(ResponseStatusException.class, () -> service.createBooking(1L, dto()));
        verify(bookingRepository, never()).save(any());
    }

    @Test
    void validBookingSaves() {
        when(carRentalRepository.findByCarId(1L)).thenReturn(Optional.of(rental()));
        when(bookingRepository.findOverlapping(eq(1L), eq(BookingStatus.CONFIRMED), any(), any(), anyLong()))
                .thenReturn(List.of());
        service.createBooking(1L, dto());
        verify(bookingRepository).save(any());
    }

    @Test
    void adminBookingDefaultsToConfirmedAndCancelsOverlappingPending() {
        CarRentalBooking overlapping = new CarRentalBooking();
        overlapping.setCar(rental().getCar());
        overlapping.setStartDate(start);
        overlapping.setEndDate(end);
        overlapping.setCustomerName("Jane");
        overlapping.setCustomerEmail("jane@test.com");

        when(carRentalRepository.findByCarId(1L)).thenReturn(Optional.of(rental()));
        when(bookingRepository.save(any())).thenAnswer(inv -> {
            CarRentalBooking b = inv.getArgument(0);
            b.setId(10L);
            when(bookingRepository.findById(10L)).thenReturn(Optional.of(b));
            return b;
        });
        when(bookingRepository.findOverlapping(1L, BookingStatus.PENDING, start, end, 10L))
                .thenReturn(List.of(overlapping));

        service.createAdminBooking(new AdminCreateBookingDto(1L, start, end,
                "Walk-in", "+34611111111", null, null, null));

        verify(bookingRepository).saveAndFlush(argThat(b -> b.getStatus() == BookingStatus.CONFIRMED));
        assertEquals(BookingStatus.CANCELLED, overlapping.getStatus());
    }

    @Test
    void confirmingCancelsOverlappingPending() {
        CarRentalBooking booking = new CarRentalBooking();
        booking.setId(10L);
        booking.setCar(rental().getCar());
        booking.setStartDate(start);
        booking.setEndDate(end);

        CarRentalBooking overlapping = new CarRentalBooking();
        overlapping.setId(11L);
        overlapping.setCar(booking.getCar());
        overlapping.setStartDate(start);
        overlapping.setEndDate(end);
        overlapping.setCustomerName("Jane");
        overlapping.setCustomerEmail("jane@test.com");

        when(bookingRepository.findById(10L)).thenReturn(Optional.of(booking));
        when(bookingRepository.findOverlapping(1L, BookingStatus.PENDING, start, end, 10L))
                .thenReturn(List.of(overlapping));

        service.updateStatus(10L, BookingStatus.CONFIRMED);

        assertEquals(BookingStatus.CONFIRMED, booking.getStatus());
        assertEquals(BookingStatus.CANCELLED, overlapping.getStatus());
    }
}
