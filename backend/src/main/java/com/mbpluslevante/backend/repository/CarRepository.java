    package com.mbpluslevante.backend.repository;

    import com.mbpluslevante.backend.model.Car;
    import com.mbpluslevante.backend.model.enums.CarStatus;
    import org.springframework.data.domain.Sort;
    import org.springframework.data.jpa.repository.EntityGraph;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.data.jpa.repository.Query;

    import java.util.List;
    import java.util.Optional;

    public interface CarRepository extends JpaRepository<Car, Long>
    {
        @EntityGraph(attributePaths = {"brand", "carSale", "images"})
        List<Car> findByDeletedAtIsNullAndCarSaleStatusNot(CarStatus status, Sort sort);
        @EntityGraph(attributePaths = {"brand", "carSale", "images"})
        List<Car> findByFeaturedTrueAndDeletedAtIsNullAndCarSaleStatusNotOrderByCreatedAtDesc(CarStatus status);
        @EntityGraph(attributePaths = {"brand", "carRental", "images"})
        List<Car> findByDeletedAtIsNullAndCarRentalIsNotNull(Sort sort);
        @Query("SELECT c.slug FROM Car c")
        List<String> findAllSlugs();
        Optional<Car> findBySlug(String slug);
        @Query("SELECT c.id FROM Car c WHERE c.deletedAt IS NULL AND c.carSale.status <> :status AND c.id <> :excludeId")
        List<Long> findIdsByStatusNotAndIdNot(CarStatus status, Long excludeId);
        @EntityGraph(attributePaths = {"brand", "carSale", "images"})
        List<Car> findByIdIn(List<Long> ids);
    }