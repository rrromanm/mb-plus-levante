package com.mbpluslevante.backend.service;

import com.mbpluslevante.backend.dto.AddCarDto;
import com.mbpluslevante.backend.dto.AddRentalCarDto;
import com.mbpluslevante.backend.dto.CarDetailsDto;
import com.mbpluslevante.backend.dto.CarDto;
import com.mbpluslevante.backend.dto.CarSitemapDto;
import com.mbpluslevante.backend.dto.EditCarDto;
import com.mbpluslevante.backend.dto.RentalCarDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CarService
{
    List<CarDto> findAll(String sort, String order);
    CarDetailsDto findBySlug(String slug);
    CarDetailsDto findById(Long id);
    void addCar(AddCarDto dto, List<MultipartFile> images);
    List<RentalCarDto> findAllRentals(String sort, String order);
    void addRentalCar(AddRentalCarDto dto, List<MultipartFile> images);
    void editCar(Long id, EditCarDto dto);
    void markCarAsSold(Long id);
    void deleteCar(Long id);
    List<CarDto> getFeaturedCars();
    void toggleFeatured(Long id);
    List<CarSitemapDto> getSitemapData();
    List<CarDto> getRecommendedCars(String slug);
}
