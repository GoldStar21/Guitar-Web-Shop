package com.github.goldstar21.backend.controller;

import com.github.goldstar21.backend.dto.ProductUpdateDto;
import com.github.goldstar21.backend.model.Product;
import com.github.goldstar21.backend.repository.ProductRepository;
import com.github.goldstar21.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")

// API ENDPOINT

//Parsira zahtjev (ulazne podatke, parametre, tijelo zahtjeva).

//Poziva odgovarajuće metode u Service sloju.

// Vraća odgovor (npr. JSON, statusni kod) klijentu.

public class ProductController {

    private final ProductService productService;
    private final ProductRepository productRepository;


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createProduct(
            @RequestPart("product") Product product,
            @RequestPart("images") MultipartFile[] images
    ) throws IOException {
        productService.createProduct(product, images);
        return ResponseEntity.ok("Product created");
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Deleted");
    }

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id) {
        return productService.getProductById(id);

    }

    // EDIT napraviti i za slike jos

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Product> productUpdate(
            @PathVariable Long id,
            @RequestPart("product") ProductUpdateDto productDto,
            @RequestPart(value = "images", required = false) MultipartFile[] images,
            @RequestParam(value = "deletedImageIds", required = false) List<Long> deletedImageIds
    ) throws IOException {

        Product updated = productService.productUpdate(id, productDto, images, deletedImageIds);

        return ResponseEntity.ok(updated);
    }

    // Prikaz slika u Shop sekciji


    @GetMapping("/type/{type}")
    public List<Product> getProductsByType(@PathVariable String type) {
        return productService.findByType(type);
    }


    // Pretraživanje tabele

    @GetMapping("/search")
    public List<Product> searchProducts(
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String model) {
        return productService.searchProducts(brand, model);
    }

    @PutMapping("/{id}/decrease")
    public ResponseEntity<String> decreaseProductQuantity(@PathVariable Long id) {
        productService.decreaseQuantity(id);
        return ResponseEntity.ok("Quantity decreased");
    }



}