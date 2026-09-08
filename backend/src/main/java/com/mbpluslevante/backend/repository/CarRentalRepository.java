package com.mbpluslevante.backend.repository;

import com.mbpluslevante.backend.model.CarRental;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CarRentalRepository extends JpaRepository<CarRental, Long>
{
    Optional<CarRental> findByCarId(Long carId);
}
