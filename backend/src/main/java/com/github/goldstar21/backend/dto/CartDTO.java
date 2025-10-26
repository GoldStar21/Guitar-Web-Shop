package com.github.goldstar21.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

// DTO class that represents one element in shopping cart

@Data
@AllArgsConstructor
public class CartDTO {

    private Long id;
    private String brand;
    private String model;
    private long price;
    private int quantity;
    private String imageUrl;


}
