package com.jasan.serviceauth.service;

import com.jasan.serviceauth.domain.User;
import com.jasan.serviceauth.repository.UserRepository;
import com.jasan.serviceauth.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Transactional
    public Long signup(String email, String password, String name) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("이미 가입된 이메일입니다.");
        }

        String encodedPassword = passwordEncoder.encode(password); // 암호화

        User user = User.builder()
                .email(email)
                .password(encodedPassword)
                .name(name)
                .build();

        return userRepository.save(user).getId();
    }

    @Transactional(readOnly = true)
    public String login(String email, String password) {
        // 1. 이메일 존재 확인
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 이메일입니다."));

        // 2. 비밀번호 검증
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        // 3. JWT 토큰 발급
        return jwtUtil.createToken(user.getId(), user.getEmail());
    }
}
