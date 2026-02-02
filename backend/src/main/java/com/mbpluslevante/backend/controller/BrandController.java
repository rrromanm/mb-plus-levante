package com.mbpluslevante.backend.controller;

import com.mbpluslevante.backend.model.Brand;
import com.mbpluslevante.backend.service.BrandService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/brands")
@Tag(name = "BrandController")
public class BrandController
{
    private final BrandService brandService;

    public BrandController(BrandService brandService){
        this.brandService = brandService;
    }

    @GetMapping("/getAll")
    public List<Brand> getAll(){
        return brandService.findAll();
    }
}
