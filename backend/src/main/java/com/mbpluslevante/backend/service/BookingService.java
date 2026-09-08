package com.mbpluslevante.backend.service;

import com.mbpluslevante.backend.dto.AdminCreateBookingDto;
import com.mbpluslevante.backend.dto.BookedRangeDto;
import com.mbpluslevante.backend.dto.BookingDto;
import com.mbpluslevante.backend.dto.CreateBookingDto;
import com.mbpluslevante.backend.model.CarRental;
import com.mbpluslevante.backend.model.CarRentalBooking;
import com.mbpluslevante.backend.model.enums.BookingStatus;
import com.mbpluslevante.backend.repository.CarRentalBookingRepository;
import com.mbpluslevante.backend.repository.CarRentalRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

// ponytail: single service class, no interface; the codebase pattern is interface+impl but nothing else will implement this
@Service
@Transactional
public class BookingService {

    private final CarRentalBookingRepository bookingRepository;
    private final CarRentalRepository carRentalRepository;

    public BookingService(CarRentalBookingRepository bookingRepository,
                          CarRentalRepository carRentalRepository) {
        this.bookingRepository = bookingRepository;
        this.carRentalRepository = carRentalRepository;
    }

    @Transactional(readOnly = true)
    public List<BookedRangeDto> getBookedDates(Long carId) {
        // only CONFIRMED blocks the calendar; overlapping PENDING requests are allowed
        return bookingRepository
                .findByCarIdAndStatusAndEndDateGreaterThanEqual(carId, BookingStatus.CONFIRMED, LocalDate.now())
                .stream()
                .map(b -> new BookedRangeDto(b.getStartDate(), b.getEndDate()))
                .toList();
    }

    public void createBooking(Long carId, CreateBookingDto dto) {
        if (dto.endDate().isBefore(dto.startDate()) || dto.startDate().isBefore(LocalDate.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid date range");
        }

        CarRental rental = carRentalRepository.findByCarId(carId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Rental car not found"));
        if (!rental.isActive() || rental.getCar().getDeletedAt() != null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Rental car not found");
        }

        if (!bookingRepository.findOverlapping(carId, BookingStatus.CONFIRMED,
                dto.startDate(), dto.endDate(), -1L).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Selected dates are not available");
        }

        CarRentalBooking booking = new CarRentalBooking();
        booking.setCar(rental.getCar());
        booking.setStartDate(dto.startDate());
        booking.setEndDate(dto.endDate());
        booking.setCustomerName(dto.customerName().trim());
        booking.setCustomerPhone(dto.customerPhone().trim());
        booking.setCustomerEmail(dto.customerEmail());
        booking.setNotes(dto.notes());
        bookingRepository.save(booking);
    }

    // admin records a booking made by phone/in person; past dates allowed for record-keeping
    public void createAdminBooking(AdminCreateBookingDto dto) {
        if (dto.endDate().isBefore(dto.startDate())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid date range");
        }
        CarRental rental = carRentalRepository.findByCarId(dto.carId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Rental car not found"));

        CarRentalBooking booking = new CarRentalBooking();
        booking.setCar(rental.getCar());
        booking.setStartDate(dto.startDate());
        booking.setEndDate(dto.endDate());
        booking.setCustomerName(dto.customerName().trim());
        booking.setCustomerPhone(dto.customerPhone().trim());
        booking.setCustomerEmail(dto.customerEmail());
        booking.setNotes(dto.notes());
        bookingRepository.save(booking);

        BookingStatus status = dto.status() == null ? BookingStatus.CONFIRMED : dto.status();
        if (status != BookingStatus.PENDING) {
            updateStatus(booking.getId(), status); // reuses overlap 409 + cancels overlapping pending
        }
    }

    @Transactional(readOnly = true)
    public List<BookingDto> findBookings(Long carId, BookingStatus status) {
        List<CarRentalBooking> bookings = carId != null
                ? bookingRepository.findByCarIdAndCarDeletedAtIsNullOrderByStartDateAsc(carId)
                : bookingRepository.findAllByCarDeletedAtIsNullOrderByCreatedAtDesc();
        return bookings.stream()
                .filter(b -> status == null || b.getStatus() == status)
                .map(this::toDto)
                .toList();
    }

    public void updateStatus(Long id, BookingStatus status) {
        CarRentalBooking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));
        booking.setStatus(status);

        if (status != BookingStatus.CONFIRMED) return;

        try {
            // flush now so the DB exclusion constraint rejects a double-confirm race
            bookingRepository.saveAndFlush(booking);
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Dates overlap an already confirmed booking");
        }

        for (CarRentalBooking other : bookingRepository.findOverlapping(
                booking.getCar().getId(), BookingStatus.PENDING,
                booking.getStartDate(), booking.getEndDate(), booking.getId())) {
            other.setStatus(BookingStatus.CANCELLED);
        }
    }

    public void deleteBooking(Long id) {
        if (!bookingRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found");
        }
        bookingRepository.deleteById(id);
    }

    private String carLabel(CarRentalBooking b) {
        return b.getCar().getBrand() + " " + b.getCar().getModel();
    }

    private BookingDto toDto(CarRentalBooking b) {
        return new BookingDto(b.getId(), b.getCar().getId(), carLabel(b), b.getCar().getMainImage(),
                b.getStartDate(), b.getEndDate(), b.getStatus(),
                b.getCustomerName(), b.getCustomerPhone(), b.getCustomerEmail(),
                b.getNotes(), b.getCreatedAt());
    }
}
