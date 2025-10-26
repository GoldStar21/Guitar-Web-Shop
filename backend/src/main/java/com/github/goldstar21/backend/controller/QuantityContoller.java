package com.github.goldstar21.backend.controller;

import com.github.goldstar21.backend.repository.ProductRepository;
import com.github.goldstar21.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/quantity")
public class QuantityContoller {

    private final ProductService productService;

    @PutMapping("/{id}/decrease")
    public ResponseEntity<String> decreaseQuantity(@PathVariable Long id) {
        try {
            productService.decreaseQuantity(id);
            return ResponseEntity.ok("Quantity decreased");
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
}
