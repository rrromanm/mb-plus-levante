    package com.mbpluslevante.backend.repository;

    import com.mbpluslevante.backend.model.Car;
    import com.mbpluslevante.backend.model.enums.CarStatus;
    import org.springframework.data.domain.Sort;
    import org.springframework.data.jpa.repository.JpaRepository;

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
        Optional<Car> findBySlugAndDeletedAtIsNull(String slug);
    }