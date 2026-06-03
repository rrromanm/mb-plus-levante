    package com.mbpluslevante.backend.repository;

    import com.mbpluslevante.backend.model.Car;
    import com.mbpluslevante.backend.model.enums.BodyType;
    import com.mbpluslevante.backend.model.enums.CarStatus;
    import com.mbpluslevante.backend.model.enums.FuelType;
    import org.springframework.data.domain.Pageable;
    import org.springframework.data.domain.Sort;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.data.jpa.repository.Query;
    import org.springframework.data.repository.query.Param;

    import java.time.LocalDateTime;
    import java.util.List;
    import java.util.Optional;

    public interface CarRepository extends JpaRepository<Car, Long>
    {
        List<Car> findByStatus(CarStatus status, Sort sort);
        List<Car> findByCreatedAtAfterAndStatusAndDeletedAtIsNullOrderByCreatedAtDesc(
                LocalDateTime date,
                CarStatus status
        );
        List<Car> findByFeaturedTrueAndStatusOrderByCreatedAtDesc(CarStatus status);
        boolean existsBySlug(String slug);
        Optional<Car> findBySlug(String slug);

        @Query("""
            SELECT c FROM Car c
            WHERE c.status = 'ACTIVE'
            AND c.id != :excludeId
            ORDER BY
                CASE WHEN c.brand.id = :brandId THEN 2 ELSE 0 END +
                CASE WHEN c.bodyType = :bodyType THEN 1 ELSE 0 END DESC,
                CASE WHEN c.fuelType = :fuelType THEN 1 ELSE 0 END DESC,
                c.createdAt DESC
            """)
        List<Car> findRecommendedCars(
            @Param("excludeId") Long excludeId,
            @Param("brandId") Long brandId,
            @Param("bodyType") BodyType bodyType,
            @Param("fuelType") FuelType fuelType,
            Pageable pageable
        );
    }