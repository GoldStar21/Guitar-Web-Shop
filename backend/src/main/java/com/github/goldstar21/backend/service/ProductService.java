package com.github.goldstar21.backend.service;

import com.github.goldstar21.backend.dto.ProductUpdateDto;
import com.github.goldstar21.backend.model.Images;
import com.github.goldstar21.backend.model.Product;
import com.github.goldstar21.backend.repository.ProductRepository;
import jakarta.transaction.Transactional;
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
import java.util.stream.Collectors;

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

    @Transactional
    public Product productUpdate(Long id, ProductUpdateDto updateProduct, MultipartFile[] images, List<Long> deletedImageIds) throws IOException {

        Product oldProduct = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));

        if (updateProduct.getBrand() != null)
            oldProduct.setBrand(updateProduct.getBrand());
        if (updateProduct.getModel() != null)
            oldProduct.setModel(updateProduct.getModel());
        if (updateProduct.getType() != null)
            oldProduct.setType(updateProduct.getType());
        if (updateProduct.getPrice() != null)
            oldProduct.setPrice(updateProduct.getPrice());
        if (updateProduct.getAmount() != null)
            oldProduct.setAmount(updateProduct.getAmount());

        // Brisanje označenih slika
        if (deletedImageIds != null && !deletedImageIds.isEmpty()) {
            List<Images> imagesToRemove = oldProduct.getImages().stream()
                    .filter(img -> deletedImageIds.contains(img.getId()))
                    .collect(Collectors.toList());

            for (Images img : imagesToRemove) {
                // Briši fajl sa diska
                Path pathToDelete = Paths.get("uploads", Paths.get(img.getImagePath()).getFileName().toString());
                Files.deleteIfExists(pathToDelete);

                // Ukloni sliku iz entiteta
                oldProduct.getImages().remove(img);
            }
        }
       // // Dodaj nove slike ako postoje
        if(images != null && images.length > 0){
            for(MultipartFile file : images){
                if (!file.isEmpty()) {
                    String path = saveFileToDisk(file);

                    Images newImg = new Images();
                    newImg.setImagePath(path);
                    newImg.setProduct(oldProduct);

                    oldProduct.getImages().add(newImg);
                }
            }
        }

        return productRepository.save(oldProduct);

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



    // Type find
    public List<Product> findByType(String type) {
        return productRepository.findByTypeIgnoreCase(type);
    }

    // Search products
    public List<Product> searchProducts(String brand, String model) {
        brand = (brand != null) ? brand.trim() : "";
        model = (model != null) ? model.trim() : "";

        List<Product> results = brand.isEmpty()
                ? productRepository.findAll()
                : productRepository.findByBrandContainingIgnoreCase(brand);

        if (!model.isEmpty()) {
            String m = model.toLowerCase();
            results = results.stream()
                    .filter(p -> p.getModel().toLowerCase().contains(m))
                    .collect(Collectors.toList());
        }

        return results;
    }


    public void decreaseQuantity(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));

        if(product.getAmount() > 0 ) {
            product.setAmount(product.getAmount() - 1);
            productRepository.save(product);
        }else {
            throw new RuntimeException("Product out of stock");
        }
    }
}
