package com.github.goldstar21.backend.service;


import com.github.goldstar21.backend.model.User;
import com.github.goldstar21.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    // Create and save new Admin/Employee into the database

    public User saveUser(User user){

        if (user.getUsername() == null || user.getUsername().isBlank()) {
            throw new IllegalArgumentException("Username cannot be empty. Please provide a valid username.");
        }
        if(userRepository.findByUsername(user.getUsername()).isPresent()){
            throw new IllegalArgumentException("Username is already in use. Please choose a different username.");
        }

        if(user.getRole() == null) {
            throw new IllegalArgumentException("Role cannot be unchecked. Please provide a valid role.");
        }

        if (user.getPassword() == null || user.getPassword().isBlank()) {
            throw new IllegalArgumentException("Password cannot be cannot be empty. Please provide a valid password.");
        }

        if(!user.getPassword().matches("^[A-Z].{6,}\\d$")) {
            throw new IllegalArgumentException("First character must be uppercase with minimum 8 characters length and minimum one number.");
        }




        String encodedPassword = passwordEncoder.encode(user.getPassword());


        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(encodedPassword);
        newUser.setRole(user.getRole());


        return userRepository.save(newUser);
    }


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUser(Long id) {
         userRepository.deleteById(id);
    }
}
