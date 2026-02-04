package com.mbpluslevante.backend.dto;

import com.mbpluslevante.backend.model.CarImage;
import com.mbpluslevante.backend.model.enums.BodyType;
import com.mbpluslevante.backend.model.enums.FuelType;
import com.mbpluslevante.backend.model.enums.Transmission;

import java.time.LocalDateTime;
import java.util.List;

public class AddCarDto
{
    public int brandId;
    public BodyType bodyType;
    public String model;
    public int year;
    public int mileage;
    public FuelType fuelType;
    public Transmission transmission;
    public String engine;
    public int powerHp;
    public List<CarImage> images;
    public AddCarDto(){}

}
