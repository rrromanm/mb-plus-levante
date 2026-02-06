package com.mbpluslevante.backend.model;
import com.mbpluslevante.backend.model.enums.RentalStatus;
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
    private Integer price;
    @Enumerated(EnumType.STRING)
    private RentalStatus status = RentalStatus.AVAILABLE;

}

