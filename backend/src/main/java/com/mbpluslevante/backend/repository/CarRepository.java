package com.mbpluslevante.backend.repository;

import com.mbpluslevante.backend.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarRepository extends JpaRepository<Car, Long> {
    List<Car> findByIsFeaturedTrue();
}