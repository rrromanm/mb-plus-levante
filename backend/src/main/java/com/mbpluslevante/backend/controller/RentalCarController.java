package com.mbpluslevante.backend.controller;

import com.mbpluslevante.backend.dto.AddRentalCarDto;
import com.mbpluslevante.backend.dto.RentalCarDto;
import com.mbpluslevante.backend.service.CarService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

// ponytail: paths kept absolute so the admin endpoints stay under the existing /admin/** security rule
@RestController
@Tag(name = "RentalCarController")
public class RentalCarController
{
    private final CarService carService;

    public RentalCarController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping("/cars/rentals")
    public List<RentalCarDto> getAllRentals(
            @RequestParam(defaultValue = "createdAt") String sort,
            @RequestParam(defaultValue = "desc") String order
    ) {
        return carService.findAllRentals(sort, order);
    }

    @PostMapping(
            value = "/admin/addRentalCar",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public void addRentalCar(@Valid @ModelAttribute AddRentalCarDto dto, @RequestParam("images") List<MultipartFile> images) {
        carService.addRentalCar(dto, images);
    }
}
