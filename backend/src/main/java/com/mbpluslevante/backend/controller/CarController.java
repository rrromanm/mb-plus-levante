package com.mbpluslevante.backend.controller;

import com.mbpluslevante.backend.dto.CarDetailsDto;
import com.mbpluslevante.backend.dto.CarDto;
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
    public List<CarDto> getAllCars(
            @RequestParam(defaultValue = "createdAt") String sort,
            @RequestParam(defaultValue = "desc") String order
    ) {
        return carService.findAll(sort, order);
    }

    @GetMapping("/getCarById/{id}")
    public CarDetailsDto getCarById(@PathVariable("id") Long id) {
        return carService.findById(id);
    }
    @GetMapping("/getFeaturedCars")
    public List<CarDto> featuredCar(){
        return carService.getFeaturedCars();
    }
    @GetMapping("/getCarBySlug/{slug}")
    public CarDetailsDto getCarBySlug(@PathVariable String slug) {
        return carService.findBySlug(slug);
    }
}
