package com.mbpluslevante.backend.controller;

import com.mbpluslevante.backend.dto.AddCarDto;
import com.mbpluslevante.backend.service.CarService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/admin")
@Tag(name = "AdminController")
public class AdminController
{
    private final CarService carService;
    public AdminController(CarService carService){
        this.carService = carService;
    }
    @PostMapping(
            value = "/addCar",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public void addCar(@Valid @ModelAttribute AddCarDto dto, @RequestParam("images") List<MultipartFile> images) {
        carService.addCar(dto, images);
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
