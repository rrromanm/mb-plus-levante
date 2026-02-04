package com.mbpluslevante.backend.service;

import com.mbpluslevante.backend.dto.AddCarDto;
import com.mbpluslevante.backend.dto.FeaturedCarsDto;
import com.mbpluslevante.backend.model.Car;

import java.util.List;

public interface CarService
{
    List<Car> findAll();
    Car findById(Long id);
    void addCar(AddCarDto dto);
    void deleteCar(Long id);
    List<FeaturedCarsDto> getFeaturedCars();
}
