package com.mbpluslevante.backend.model;

import com.mbpluslevante.backend.model.enums.BodyType;
import com.mbpluslevante.backend.model.enums.CarStatus;
import com.mbpluslevante.backend.model.enums.FuelType;
import com.mbpluslevante.backend.model.enums.Transmission;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cars")
@Getter
@Setter
@NoArgsConstructor
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;

    @Column(nullable = false)
    private String model;
    private Integer year;
    private Integer mileageKm;

    @Enumerated(EnumType.STRING)
    private FuelType fuelType;

    @Enumerated(EnumType.STRING)
    private BodyType bodyType;

    @Enumerated(EnumType.STRING)
    private Transmission transmission;

    @Size(max = 800)
    private String description;
    private String engine;
    private Integer powerHp;

    @Column(nullable = false, unique = true)
    private String slug;
    private boolean featured = false;

    @Enumerated(EnumType.STRING)
    private CarStatus status = CarStatus.ACTIVE;
    private LocalDateTime createdAt;
    private LocalDateTime soldAt;
    private LocalDateTime deletedAt;

    @OneToOne(mappedBy = "car")
    private CarSale carSale;

    @OneToOne(mappedBy = "car")
    private CarRental carRental;

    @OneToMany(mappedBy = "car", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("orderIndex ASC")
    private List<CarImage> images = new ArrayList<>();
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public String getBrand(){
        return brand.getName();
    }
    public Integer getSalePrice() {
        return carSale != null ? carSale.getPrice() : null;
    }
    public String getMainImage() {
        return images.stream()
                .filter(CarImage::isPrimary)
                .map(CarImage::getImageUrl)
                .findFirst()
                .orElse(null);
    }

}
