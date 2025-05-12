package com.github.goldstar21.backend.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}