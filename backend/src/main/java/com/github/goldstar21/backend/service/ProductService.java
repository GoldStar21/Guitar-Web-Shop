package com.github.goldstar21.backend.service;

import com.github.goldstar21.backend.model.Images;
import com.github.goldstar21.backend.model.Product;
import com.github.goldstar21.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    // Create product in table
    
    public Product createProduct(Product product, MultipartFile[] images) throws IOException {
        for (MultipartFile file : images) {
            String path = saveFileToDisk(file);
            Images img = new Images();
            img.setImagePath(path);
            img.setProduct(product);
            product.getImages().add(img);
        }
        return productRepository.save(product);
    }

    // Save file to disk

    private String saveFileToDisk(MultipartFile file) throws IOException {
        String uploadDir = "uploads/";
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);
        Files.createDirectories(filePath.getParent());
        Files.write(filePath, file.getBytes());
        return "/uploads/" + fileName;
    }


    // Display all products

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }


    // Product DELETE

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    // Product VIEW

    public Product getProductById(@PathVariable Long id) {
        return productRepository.findById(id).get();
    }


}
