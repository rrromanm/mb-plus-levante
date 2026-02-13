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
import com.mbpluslevante.backend.service.ImageService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import com.mbpluslevante.backend.util.SlugUtil;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class CarServiceImpl implements CarService {
    private final CarRepository carRepository;
    private final CarSaleRepository carSaleRepository;
    private final BrandRepository brandRepository;
    private final CarImageRepository carImageRepository;
    private final ImageService imageService;

    public CarServiceImpl(CarRepository carRepository, CarSaleRepository carSaleRepository, BrandRepository brandRepository,
                          CarImageRepository carImageRepository, ImageService imageService) {
        this.carRepository = carRepository;
        this.carSaleRepository = carSaleRepository;
        this.brandRepository = brandRepository;
        this.carImageRepository = carImageRepository;
        this.imageService = imageService;
    }
    @Override
    public List<CarDto> findAll() {
        return carRepository.findByDeletedAtNullOrderByCreatedAtDesc()
                .stream()
                .map(car -> new CarDto(
                        car.getId(),
                        car.getBrand(),
                        car.getModel(),
                        car.getYear(),
                        car.getSalePrice(),
                        car.getMileageKm(),
                        car.getSlug(),
                        car.getMainImage(),
                        car.isFeatured()
                )).toList();
    }
    @Override
    public Car findById(Long id) {
        return carRepository.findById(id).orElse(null);
    }
    @Override
    @Transactional
    public void addCar(AddCarDto dto, List<MultipartFile> images) {
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

        List<CarImage> uploadedImages = uploadCarImages(images, car);
        carImageRepository.saveAll(uploadedImages);
    }

    @Override
    public void deleteCar(Long id) {
        carRepository.updateDeletedAt(id, LocalDateTime.now());
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

    private List<CarImage> uploadCarImages(
            List<MultipartFile> images,
            Car car
    ) {

        List<CompletableFuture<CarImage>> futures = new ArrayList<>();

        for (int i = 0; i < images.size(); i++) {

            MultipartFile file = images.get(i);

            if (file == null || file.isEmpty()) continue;

            int index = i;

            futures.add(
                    CompletableFuture.supplyAsync(() -> {

                        String publicId = imageService.upload(file);

                        CarImage image = new CarImage();
                        image.setCar(car);
                        image.setImageUrl(publicId);
                        image.setOrderIndex(index);
                        image.setPrimary(index == 0);

                        return image;
                    })
            );
        }

        return futures.stream()
                .map(CompletableFuture::join)
                .toList();
    }

}
