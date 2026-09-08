package com.mbpluslevante.backend.repository;

import com.mbpluslevante.backend.model.CarRentalBooking;
import com.mbpluslevante.backend.model.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface CarRentalBookingRepository extends JpaRepository<CarRentalBooking, Long> {

    List<CarRentalBooking> findByCarIdAndStatusAndEndDateGreaterThanEqual(Long carId, BookingStatus status, LocalDate date);

    List<CarRentalBooking> findByCarIdAndCarDeletedAtIsNullOrderByStartDateAsc(Long carId);

    List<CarRentalBooking> findAllByCarDeletedAtIsNullOrderByCreatedAtDesc();

    @Query("""
            select b from CarRentalBooking b
            where b.car.id = :carId and b.status = :status and b.id <> :excludeId
              and b.startDate <= :endDate and b.endDate >= :startDate
            """)
    List<CarRentalBooking> findOverlapping(@Param("carId") Long carId,
                                           @Param("status") BookingStatus status,
                                           @Param("startDate") LocalDate startDate,
                                           @Param("endDate") LocalDate endDate,
                                           @Param("excludeId") Long excludeId);
}
