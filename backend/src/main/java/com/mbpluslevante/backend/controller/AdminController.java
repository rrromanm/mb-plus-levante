package com.mbpluslevante.backend.controller;

import com.mbpluslevante.backend.repository.CarRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@Tag(name = "AdminController")
public class AdminController
{
    private final CarRepository carRepository;
    public AdminController(CarRepository carRepository){
        this.carRepository = carRepository;
    }
    @GetMapping("/ping")
    public String ping() {
        return "admin ok";
    }
}
