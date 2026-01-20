package com.mbpluslevante.backend.repository;

import com.mbpluslevante.backend.model.CarRental;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRentalRepository extends JpaRepository<CarRental, Long>
{

}
