package com.mbpluslevante.backend.controller;

import com.mbpluslevante.backend.model.Car;
import com.mbpluslevante.backend.service.CarService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@Tag(name = "AdminController")
public class AdminController
{
    private final CarService carService;
    public AdminController(CarService carService){
        this.carService = carService;
    }
    @PostMapping("/addCar")
    public void addCar(@RequestBody Car car) {
        carService.addCar(car);
    }
    @DeleteMapping("/deleteCar/{id}")
    public void deleteCar(@PathVariable Long id) {
        carService.deleteCar(id);
    }
    @GetMapping("/ping")
    public ResponseEntity<Void> ping() {
        return ResponseEntity.ok().build();
    }
}
