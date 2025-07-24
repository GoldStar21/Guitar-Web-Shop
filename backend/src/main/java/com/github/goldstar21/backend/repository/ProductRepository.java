package com.github.goldstar21.backend.repository;


import com.github.goldstar21.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

     List<Product> id(Long id);

    List<Product> findByTypeIgnoreCase(String type);


}
