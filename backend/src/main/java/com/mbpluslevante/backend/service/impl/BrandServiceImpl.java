package com.mbpluslevante.backend.service.impl;

import com.mbpluslevante.backend.model.Brand;
import com.mbpluslevante.backend.repository.BrandRepository;
import com.mbpluslevante.backend.service.BrandService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandServiceImpl implements BrandService
{

    private final BrandRepository brandRepository;

    public BrandServiceImpl(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    @Override
    public List<Brand> findAll() {
        return brandRepository.findAll();
    }
}
