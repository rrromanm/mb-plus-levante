package com.mbpluslevante.backend.controller;

import com.mbpluslevante.backend.dto.FeaturedCarsDto;
import com.mbpluslevante.backend.model.Car;
import com.mbpluslevante.backend.service.CarService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cars")
@Tag(name = "CarController")
public class CarController
{
    private final CarService carService;

    public CarController(CarService carServiceImpl) {
        this.carService = carServiceImpl;
    }
    @GetMapping("/getAll")
    public List<Car> car(){
        return carService.findAll();
    }
    @GetMapping("/getFeatured")
    public List<FeaturedCarsDto> featuredCar(){
        return carService.getFeaturedCars();
    }
    @GetMapping("/car/{id}")
    public Car carById(@PathVariable Long id) {
        return carService.findById(id);
    }
}
