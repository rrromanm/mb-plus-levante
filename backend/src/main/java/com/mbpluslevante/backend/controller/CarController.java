package com.mbpluslevante.backend.controller;

import com.mbpluslevante.backend.dto.CarDetailsDto;
import com.mbpluslevante.backend.dto.CarDto;
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
    public List<CarDto> car(){
        return carService.findAll();
    }
    @GetMapping("/getFeaturedCars")
    public List<FeaturedCarsDto> featuredCar(){
        return carService.getFeaturedCars();
    }
    @GetMapping("/getCarBySlug/{slug}")
    public CarDetailsDto getCarBySlug(@PathVariable String slug) {
        return carService.findBySlug(slug);
    }
}
