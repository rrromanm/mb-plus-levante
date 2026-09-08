package com.mbpluslevante.backend.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "car_rentals")
public class CarRental {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "car_id", nullable = false, unique = true)
    private Car car;
    @Column(nullable = false)
    private Integer pricePerDay;
    private Integer pricePerMonth;
    @Column(nullable = false)
    private boolean active = true;

}
