package com.mbpluslevante.backend.controller;

import com.mbpluslevante.backend.model.Car;
import com.mbpluslevante.backend.repository.CarRepository;
import com.mbpluslevante.backend.service.CarService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CarController
{
    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }
    @GetMapping("/cars")
    public List<Car> car(){
        return carService.findAll();
    }
}
