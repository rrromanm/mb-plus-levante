package com.mbpluslevante.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "brands")
public class Brand
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false, unique = true)
    private String key;
    private String logoUrl;
}
