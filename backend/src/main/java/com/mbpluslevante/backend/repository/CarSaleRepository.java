package com.mbpluslevante.backend.repository;

import com.mbpluslevante.backend.dto.FeaturedCarsDto;
import com.mbpluslevante.backend.model.Car;
import com.mbpluslevante.backend.model.CarSale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CarSaleRepository extends JpaRepository<CarSale, Long>
{
    @Query("""
    select new com.mbpluslevante.backend.dto.FeaturedCarsDto(
        b.name,
        c.model,
        c.year,
        cs.price,
        c.mileageKm,
        c.slug,
        i.imageUrl
    )
    from CarSale cs
    join cs.car c
    join c.images i
    join c.brand b
    where c.featured = true
        and i.isPrimary = true
    """)
    List<FeaturedCarsDto> findByFeaturedTrue();
}
