package com.github.goldstar21.backend.model;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String brand;
    private String model;
    private String type;
    private BigDecimal price;
    private Integer amount;
    private String formattedPrice;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Images> images = new ArrayList<>();



    // Dodatni getter za imageUrl - vraća URL prve slike ili default
    @JsonProperty("imageUrl")
    public String getImageUrl() {
        if (images.isEmpty()) {
            return "/uploads/default.jpg";
        }
        return "/uploads/" + images.get(0).getImagePath();
    }

}
