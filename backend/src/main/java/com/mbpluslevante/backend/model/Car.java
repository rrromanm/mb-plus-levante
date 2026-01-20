package com.mbpluslevante.backend.model;

import com.mbpluslevante.backend.model.enums.CarStatus;
import com.mbpluslevante.backend.model.enums.FuelType;
import com.mbpluslevante.backend.model.enums.Transmission;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cars")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_type_id", nullable = false)
    private VehicleType vehicleType;
    @Column(nullable = false)
    private String model;
    private Integer year;
    private Integer mileageKm;
    @Enumerated(EnumType.STRING)
    private FuelType fuelType;
    @Enumerated(EnumType.STRING)
    private Transmission transmission;
    private String engine;
    private Integer powerHp;
    @Column(nullable = false, unique = true)
    private String slug;
    private boolean isFeatured = false;
    @Enumerated(EnumType.STRING)
    private CarStatus status = CarStatus.ACTIVE;
    private LocalDateTime createdAt;
    private LocalDateTime soldAt;
    private LocalDateTime deletedAt;
    @OneToMany(mappedBy = "car", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("orderIndex ASC")
    private List<CarImage> images;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

}
