package com.javapractice.auth.controller;

import com.javapractice.auth.model.User;
import com.javapractice.auth.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {

        User user = authService.register(
                request.get("firstName"),
                request.get("lastName"),
                request.get("email"),
                request.get("password")
        );

        return ResponseEntity.ok(
                Map.of(
                        "message", "Registration successful",
                        "id", user.getId(),
                        "email", user.getEmail()
                )
        );
    }
}