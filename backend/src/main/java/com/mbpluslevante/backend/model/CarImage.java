package com.mbpluslevante.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "car_images")
public class CarImage
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageUrl;
    private Boolean mainImage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "carId")
    private Car car;
}
