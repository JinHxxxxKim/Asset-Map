package com.jasan.serviceauth.controller;

import com.jasan.serviceauth.service.AuthService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupRequest request) {
        Long userId = authService.signup(request.email, request.password, request.name);
        return ResponseEntity.ok("회원가입 성공 ID: " + userId);
    }

    @Data
    static class SignupRequest {
        private String email;
        private String password;
        private String name;
    }

    // ✨ 로그인 API
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        String token = authService.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(new LoginResponse(token));
    }

    @GetMapping("/test")
    public String test() {
        return "Authorized!";
    }

    // DTO
    @Data
    static class LoginRequest {
        private String email;
        private String password;
    }

    @Data
    static class LoginResponse {
        private String accessToken;

        public LoginResponse(String accessToken) {
            this.accessToken = accessToken;
        }
    }
}