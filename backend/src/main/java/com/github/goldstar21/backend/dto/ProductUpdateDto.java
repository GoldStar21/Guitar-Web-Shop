package com.github.goldstar21.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductUpdateDto {

    private String brand;
    private String model;
    private String type;
    private BigDecimal price;
    private Integer amount;
}
