package com.mbpluslevante.backend.service.impl;

import com.mbpluslevante.backend.dto.FeaturedCarsDto;
import com.mbpluslevante.backend.model.Car;
import com.mbpluslevante.backend.repository.CarRepository;
import com.mbpluslevante.backend.repository.CarSaleRepository;
import com.mbpluslevante.backend.service.CarService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarServiceImpl implements CarService {
    private final CarRepository carRepository;
    private final CarSaleRepository carSaleRepository;
    public CarServiceImpl(CarRepository carRepository, CarSaleRepository carSaleRepository) {
        this.carRepository = carRepository;
        this.carSaleRepository = carSaleRepository;
    }
    @Override
    public List<Car> findAll() {
        return carRepository.findAll();
    }
    @Override
    public Car findById(Long id) {
        return carRepository.findById(id).orElse(null);
    }
    @Override
    public void addCar(Car car) {
        carRepository.save(car);
    }

    @Override
    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }
    @Override
    public List<FeaturedCarsDto> getFeaturedCars() {
        return carSaleRepository.findByFeaturedTrue();
    }
}
