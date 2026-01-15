package com.mbpluslevante.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CarController
{
    @GetMapping("/car")
    public String car(){
        return "Mercedes-Benz";
    }
}
