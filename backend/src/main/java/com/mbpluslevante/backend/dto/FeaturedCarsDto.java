package com.mbpluslevante.backend.dto;
public class FeaturedCarsDto {

    private String brand;
    private String model;
    private Integer year;
    private Integer price;
    private Integer mileageKm;
    private String slug;
    private String mainImageUrl;

    public FeaturedCarsDto(
            String brand,
            String model,
            Integer year,
            Integer price,
            Integer mileageKm,
            String slug,
            String mainImageUrl
    ) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.price = price;
        this.mileageKm = mileageKm;
        this.slug = slug;
        this.mainImageUrl = mainImageUrl;
    }
    public String getBrand() {
        return brand;
    }
    public String getModel() {
        return model;
    }
    public Integer getYear() {
        return year;
    }
    public Integer getPrice() {
        return price;
    }
    public Integer getMileageKm() {
        return mileageKm;
    }
    public String getSlug() {
        return slug;
    }
    public String getMainImageUrl() {
        return mainImageUrl;
    }
}
