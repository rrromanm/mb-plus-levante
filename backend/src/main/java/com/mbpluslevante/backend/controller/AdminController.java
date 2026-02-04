package com.mbpluslevante.backend.controller;

import com.mbpluslevante.backend.dto.AddCarDto;
import com.mbpluslevante.backend.service.CarService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    public void addCar(@Valid @RequestBody AddCarDto dto) {
        carService.addCar(dto);
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
