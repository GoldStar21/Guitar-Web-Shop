package com.github.goldstar21.backend.controller;


import com.github.goldstar21.backend.model.User;
import com.github.goldstar21.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {


    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try{
            User savedUser = userService.saveUser(user);
            return ResponseEntity.ok(savedUser);

        }catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?>  deleteUser(@PathVariable long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("Deleted");
    }
}
