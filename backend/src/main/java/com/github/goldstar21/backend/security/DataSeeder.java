package com.github.goldstar21.backend.security;

import com.github.goldstar21.backend.model.User;
import com.github.goldstar21.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {

        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setUsername("Admin21");
            admin.setPassword(passwordEncoder.encode("Admin1234"));
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println("Admin user created: username=Admin21, password=Admin1234");
        } else {
            System.out.println("Admin user already exists, skipping seeding.");
        }

        if (userRepository.count() == 0) {
            User employee = new User();
            employee.setUsername("Employee21");
            employee.setPassword(passwordEncoder.encode("Employee1234"));
            employee.setRole("EMPLOYEE");
            userRepository.save(employee);
            System.out.println("Employee user created: username=Employee21, password=Employee1234");
        } else {
            System.out.println("Employee user already exists, skipping seeding.");
        }


    }
}
