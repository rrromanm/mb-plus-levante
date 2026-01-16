package com.mbpluslevante.backend.service;

import com.mbpluslevante.backend.model.Car;

import java.util.List;

public interface CarService
{
    List<Car> findAll();
    Car findById(Long id);
    void addCar(Car car);
    void deleteCar(Long id);
}
