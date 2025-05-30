package com.github.goldstar21.backend.service;

import com.github.goldstar21.backend.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String jwtSecretKey;

    //generate a secreate key method
    private SecretKey generateSecreteKey(){
        return Keys.hmacShaKeyFor(jwtSecretKey.getBytes(StandardCharsets.UTF_8));
    }
    public SecretKey getSecretKey() {
        return Keys.hmacShaKeyFor(jwtSecretKey.getBytes(StandardCharsets.UTF_8));
    }

    // create token method
    public String createToken(User user) {
        return Jwts.builder()
                .subject(user.getId().toString())                 // ID kao subject
                .claim("username", user.getUsername())           // korisničko ime
                .claim("role", user.getRole())                   // uloga iz entiteta
                .issuedAt(new Date())                            // trenutni timestamp
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // npr. 1 sat
                .signWith(generateSecreteKey())                  // potpisivanje sa tajnim ključem
                .compact();
    }


    public Long generateUserIdFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(generateSecreteKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return Long.valueOf(claims.getSubject()); // ID je subject
    }




}
