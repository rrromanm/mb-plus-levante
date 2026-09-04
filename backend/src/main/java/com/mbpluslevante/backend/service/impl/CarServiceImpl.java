package com.mbpluslevante.backend.service.impl;

import com.mbpluslevante.backend.dto.*;
import com.mbpluslevante.backend.model.Brand;
import com.mbpluslevante.backend.model.Car;
import com.mbpluslevante.backend.model.CarImage;
import com.mbpluslevante.backend.model.CarRental;
import com.mbpluslevante.backend.model.CarSale;
import com.mbpluslevante.backend.model.enums.CarStatus;
import com.mbpluslevante.backend.repository.BrandRepository;
import com.mbpluslevante.backend.repository.CarImageRepository;
import com.mbpluslevante.backend.repository.CarRentalRepository;
import com.mbpluslevante.backend.repository.CarRepository;
import com.mbpluslevante.backend.repository.CarSaleRepository;
import com.mbpluslevante.backend.service.CarService;
import com.mbpluslevante.backend.service.ImageService;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.mbpluslevante.backend.util.SlugUtil;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
@Transactional
public class CarServiceImpl implements CarService {
    private final CarRepository carRepository;
    private final CarSaleRepository carSaleRepository;
    private final CarRentalRepository carRentalRepository;
    private final BrandRepository brandRepository;
    private final CarImageRepository carImageRepository;
    private final ImageService imageService;

    public CarServiceImpl(CarRepository carRepository, CarSaleRepository carSaleRepository, CarRentalRepository carRentalRepository,
                          BrandRepository brandRepository,
                          CarImageRepository carImageRepository, ImageService imageService) {
        this.carRepository = carRepository;
        this.carSaleRepository = carSaleRepository;
        this.carRentalRepository = carRentalRepository;
        this.brandRepository = brandRepository;
        this.carImageRepository = carImageRepository;
        this.imageService = imageService;
    }

    @Override
    @Transactional(readOnly = true)
    public List<CarDto> findAll(String sort, String order) {

        Sort.Direction direction =
                order.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;

        Sort sorting = Sort.by(direction, sort);

        return carRepository
                .findByDeletedAtIsNullAndCarSaleStatusNot(CarStatus.SOLD, sorting)
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
                        car.getFuelType(),
                        car.getTransmission(),
                        car.getPowerHp(),
                        car.isFeatured(),
                        car.getCreatedAt()
                ))
                .toList();
    }
    @Override
    @Transactional(readOnly = true)
    public CarDetailsDto findBySlug(String slug) {
        Car car = carRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Car not found"));

        return new CarDetailsDto(
                car.getBrand(),
                car.getModel(),
                car.getYear(),
                car.getSalePrice(),
                car.getMileageKm(),
                car.getSlug(),
                car.getImages()
                        .stream()
                        .map(image -> new CarImageDto(
                                image.getImageUrl(),
                                image.isPrimary(),
                                image.getOrderIndex()
                        ))
                        .toList(),
                car.getDescription(),
                car.getFuelType(),
                car.getTransmission(),
                car.getEngine(),
                car.getPowerHp(),
                car.getBodyType(),
                car.getStatus()
        );
    }

    @Override
    @Transactional(readOnly = true)
    public CarDetailsDto findById(Long id) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found"));

        return new CarDetailsDto(
                car.getBrand(),
                car.getModel(),
                car.getYear(),
                car.getSalePrice(),
                car.getMileageKm(),
                car.getSlug(),
                car.getImages()
                        .stream()
                        .map(image -> new CarImageDto(
                                image.getImageUrl(),
                                image.isPrimary(),
                                image.getOrderIndex()
                        ))
                        .toList(),
                car.getDescription(),
                car.getFuelType(),
                car.getTransmission(),
                car.getEngine(),
                car.getPowerHp(),
                car.getBodyType(),
                car.getStatus()
        );
    }

    @Override
    public void addCar(AddCarDto dto, List<MultipartFile> images) {
        Brand brand = brandRepository.findById(dto.brandId).orElse(null);
        String slug = generateSlug(brand, dto.getModel(), dto.getYear());
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
        car.setDescription(dto.description);
        carRepository.save(car);

        CarSale carSale = new CarSale();
        carSale.setPrice(dto.price);
        carSale.setCar(car);
        carSaleRepository.save(carSale);

        List<CarImage> uploadedImages = uploadCarImages(images, car, "");
        carImageRepository.saveAll(uploadedImages);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RentalCarDto> findAllRentals(String sort, String order) {
        Sort.Direction direction =
                order.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;

        return carRepository
                .findByDeletedAtIsNullAndCarRentalIsNotNull(Sort.by(direction, sort))
                .stream()
                .map(car -> new RentalCarDto(
                        car.getId(),
                        car.getBrand(),
                        car.getModel(),
                        car.getYear(),
                        car.getMileageKm(),
                        car.getSlug(),
                        car.getMainImage(),
                        car.getFuelType(),
                        car.getTransmission(),
                        car.getPowerHp(),
                        car.isFeatured(),
                        car.getCreatedAt(),
                        car.getCarRental().getPricePerDay(),
                        car.getCarRental().getPricePerMonth(),
                        car.getCarRental().isActive()
                ))
                .toList();
    }

    @Override
    public void addRentalCar(AddRentalCarDto dto, List<MultipartFile> images) {
        Brand brand = brandRepository.findById(dto.brandId)
                .orElseThrow(() -> new RuntimeException("Brand not found"));

        Car car = new Car();
        car.setBrand(brand);
        car.setModel(dto.model);
        car.setYear(dto.year);
        car.setMileageKm(dto.mileageKm);
        car.setFuelType(dto.fuelType);
        car.setTransmission(dto.transmission);
        car.setSlug(generateSlug(brand, dto.model, dto.year));
        carRepository.save(car);

        CarRental rental = new CarRental();
        rental.setCar(car);
        rental.setPricePerDay(dto.pricePerDay);
        rental.setPricePerMonth(dto.pricePerMonth);
        carRentalRepository.save(rental);

        carImageRepository.saveAll(uploadCarImages(images, car, "rentals"));
    }

    @Override
    public void editCar(Long id, EditCarDto dto) {

        Car car = carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found"));

        Brand brand = brandRepository.findById(dto.getBrandId())
                .orElseThrow(() -> new RuntimeException("Brand not found"));
        car.setBrand(brand);

        car.setModel(dto.getModel());

        car.setYear(dto.getYear());

        car.setMileageKm(dto.getMileageKm());

        car.setFuelType(dto.getFuelType());

        car.setTransmission(dto.getTransmission());

        car.setEngine(dto.getEngine());

        car.setPowerHp(dto.getPowerHp());

        car.setBodyType(dto.getBodyType());

        car.setDescription(dto.getDescription());
        car.getCarSale().setPrice(dto.getPrice());
    }

    @Override
    public void markCarAsSold(Long id) {
        Car car = carRepository.findById(id).orElseThrow(() -> new RuntimeException("Car not found"));

        CarSale carSale = car.getCarSale();
        if (carSale == null) throw new RuntimeException("Car has no sale listing");

        carSale.setStatus(CarStatus.SOLD);
        carSale.setSoldAt(LocalDateTime.now());
    }

    @Override
    public void deleteCar(Long id) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found"));

        car.setDeletedAt(LocalDateTime.now());
        car.setFeatured(false);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CarDto> getFeaturedCars() {
        return carRepository.findByFeaturedTrueAndDeletedAtIsNullAndCarSaleStatusNotOrderByCreatedAtDesc(CarStatus.SOLD)
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
                        car.getFuelType(),
                        car.getTransmission(),
                        car.getPowerHp(),
                        car.isFeatured(),
                        car.getCreatedAt()
                ))
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<CarSitemapDto> getSitemapData() {
        return carRepository.findAll().stream()
                .map(car -> new CarSitemapDto(car.getSlug(), car.getCreatedAt()))
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<CarDto> getRecommendedCars(String slug) {
        Car car = carRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Car not found"));

        List<Long> carIds = new ArrayList<>(
                carRepository.findIdsByStatusNotAndIdNot(CarStatus.SOLD, car.getId())
        );
        if (carIds.isEmpty()) return List.of();
        Collections.shuffle(carIds);
        List<Long> randomIds = carIds.stream().limit(6).toList();

        return carRepository.findByIdIn(randomIds).stream().map(c -> new CarDto(
                c.getId(),
                c.getBrand(),
                c.getModel(),
                c.getYear(),
                c.getSalePrice(),
                c.getMileageKm(),
                c.getSlug(),
                c.getMainImage(),
                c.getFuelType(),
                c.getTransmission(),
                c.getPowerHp(),
                c.isFeatured(),
                c.getCreatedAt()
        )).toList();
    }


    @Override
    public void toggleFeatured(Long id) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found"));

        car.setFeatured(!car.isFeatured());
    }

    private String generateSlug(Brand brand, String model, Integer year) {
        String slug = SlugUtil.slugify(
                brand.getSlug() + " " + model + " " + year
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
            Car car,
            String subfolder
    ) {

        List<CompletableFuture<CarImage>> futures = new ArrayList<>();

        for (int i = 0; i < images.size(); i++) {

            MultipartFile file = images.get(i);

            if (file == null || file.isEmpty()) continue;

            int index = i;

            futures.add(
                    CompletableFuture.supplyAsync(() -> {

                        String publicId = imageService.upload(file, subfolder);

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
