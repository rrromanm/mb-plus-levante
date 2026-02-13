package com.mbpluslevante.backend.service;

import com.mbpluslevante.backend.dto.AddCarDto;
import com.mbpluslevante.backend.dto.CarDetailsDto;
import com.mbpluslevante.backend.dto.CarDto;
import com.mbpluslevante.backend.dto.FeaturedCarsDto;
import com.mbpluslevante.backend.model.Car;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CarService
{
    List<CarDto> findAll();
    CarDetailsDto findBySlug(String slug);
    CarDetailsDto findById(Long id);
    void addCar(AddCarDto dto, List<MultipartFile> images);
    void deleteCar(Long id);
    List<FeaturedCarsDto> getFeaturedCars();
    void toggleFeatured(Long id);
}
