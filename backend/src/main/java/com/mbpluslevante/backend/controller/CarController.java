package com.mbpluslevante.backend.controller;

import com.mbpluslevante.backend.model.Car;
import com.mbpluslevante.backend.service.CarService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "CarController")
public class CarController
{
    private final CarService carService;

    public CarController(CarService carServiceImpl) {
        this.carService = carServiceImpl;
    }
    @GetMapping("/cars")
    public List<Car> car(){
        return carService.findAll();
    }
    @GetMapping("/car/{id}")
    public Car carById(@PathVariable Long id) {
        return carService.findById(id);
    }
    @PostMapping("/addCar")
    public void addCar(@RequestBody Car car) {
        carService.addCar(car);
    }
    @DeleteMapping("/deleteCar/{id}")
    public void deleteCar(@PathVariable Long id) {
        carService.deleteCar(id);
    }
}
