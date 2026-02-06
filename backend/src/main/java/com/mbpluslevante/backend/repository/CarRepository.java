    package com.mbpluslevante.backend.repository;

    import com.mbpluslevante.backend.model.Car;
    import jakarta.transaction.Transactional;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.data.jpa.repository.Modifying;
    import org.springframework.data.jpa.repository.Query;
    import org.springframework.data.repository.query.Param;

    import java.time.LocalDateTime;
    import java.util.List;

    public interface CarRepository extends JpaRepository<Car, Long>
    {
        List<Car> findByDeletedAtNullOrderByCreatedAtDesc();
        @Modifying
        @Transactional
        @Query("""
        UPDATE Car c
        SET c.deletedAt = :deletedAt
        WHERE c.id = :id
        """)
        void updateDeletedAt(@Param("id") Long id, @Param("deletedAt") LocalDateTime dateTime);
        boolean existsBySlug(String slug);
    }