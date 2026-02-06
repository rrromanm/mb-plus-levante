package com.mbpluslevante.backend.service.impl;

import com.mbpluslevante.backend.dto.AddCarDto;
import com.mbpluslevante.backend.dto.CarDto;
import com.mbpluslevante.backend.dto.FeaturedCarsDto;
import com.mbpluslevante.backend.model.Brand;
import com.mbpluslevante.backend.model.Car;
import com.mbpluslevante.backend.model.CarImage;
import com.mbpluslevante.backend.model.CarSale;
import com.mbpluslevante.backend.repository.BrandRepository;
import com.mbpluslevante.backend.repository.CarImageRepository;
import com.mbpluslevante.backend.repository.CarRepository;
import com.mbpluslevante.backend.repository.CarSaleRepository;
import com.mbpluslevante.backend.service.CarService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import com.mbpluslevante.backend.util.SlugUtil;

import java.util.List;

@Service
public class CarServiceImpl implements CarService {
    private final CarRepository carRepository;
    private final CarSaleRepository carSaleRepository;
    private final BrandRepository brandRepository;
    private final CarImageRepository carImageRepository;

    public CarServiceImpl(CarRepository carRepository, CarSaleRepository carSaleRepository, BrandRepository brandRepository, CarImageRepository carImageRepository) {
        this.carRepository = carRepository;
        this.carSaleRepository = carSaleRepository;
        this.brandRepository = brandRepository;
        this.carImageRepository = carImageRepository;
    }
    @Override
    public List<CarDto> findAll() {
        return carRepository.findByDeletedAtNullOrderByCreatedAtDesc()
                .stream()
                .map(car -> new CarDto(
                        car.getBrand(),
                        car.getModel(),
                        car.getYear(),
                        car.getMileageKm(),
                        car.getSalePrice(),
                        car.getSlug(),
                        car.getMainImage()
                )).toList();
    }
    @Override
    public Car findById(Long id) {
        return carRepository.findById(id).orElse(null);
    }
    @Override
    @Transactional
    public void addCar(AddCarDto dto) {
        Brand brand = brandRepository.findById(dto.brandId).orElse(null);
        String slug = generateSlug(brand, dto);
        Car car = new Car();
        car.setBrand(brand);
        car.setModel(dto.model);
        car.setYear(dto.year);
        car.setMileageKm(dto.mileageKm);
        car.setFuelType(dto.fuelType);
        car.setBodyType(dto.bodyType);
        car.setEngine(dto.engine);
        car.setPowerHp(dto.powerHp);
        car.setTransmission(dto.transmission);
        car.setSlug(slug);

        carRepository.save(car);

        CarSale carSale = new CarSale();
        carSale.setPrice(dto.price);
        carSale.setCar(car);

        carSaleRepository.save(carSale);

        for (int i = 0; i < dto.imageUrls.size(); i++) {
            String url = dto.imageUrls.get(i);

            if (url == null || url.isBlank()) continue;

            CarImage image = new CarImage();
            image.setCar(car);
            image.setImageUrl(url);
            image.setOrderIndex(i);
            image.setPrimary(i == 0);

            carImageRepository.save(image);
        }
    }

    @Override
    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }
    @Override
    public List<FeaturedCarsDto> getFeaturedCars() {
        return carSaleRepository.findByFeaturedTrue();
    }
    private String generateSlug(Brand brand, AddCarDto dto) {
        String slug = SlugUtil.slugify(
                brand.getSlug() + " " +
                        dto.getModel() + " " +
                        dto.getYear()
        );
        String uniqueSlug = slug;
        int counter = 2;

        while (carRepository.existsBySlug(uniqueSlug)) {
            uniqueSlug = slug + "-" + counter++;
        }

        return uniqueSlug;
    }
}
