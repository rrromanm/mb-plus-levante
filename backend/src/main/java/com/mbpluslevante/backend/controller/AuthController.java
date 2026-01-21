package com.mbpluslevante.backend.controller;

import com.mbpluslevante.backend.dto.LoginRequestDto;
import com.mbpluslevante.backend.model.Admin;
import com.mbpluslevante.backend.repository.AdminRepository;
import com.mbpluslevante.backend.security.JwtService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jdk.jfr.Name;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
@Tag(name = "AuthController")
public class AuthController
{
    private final AdminRepository adminRepository;
    private final JwtService jwt;
    private final BCryptPasswordEncoder encoder;

    public AuthController(AdminRepository adminRepository, JwtService jwt, BCryptPasswordEncoder encoder) {
        this.adminRepository = adminRepository;
        this.jwt = jwt;
        this.encoder = encoder;
    }
    @PostMapping("/login")
    public ResponseEntity<Void> login(@Valid @RequestBody LoginRequestDto request, HttpServletResponse response)
    {
        Admin admin = adminRepository.findByUsername(request.username())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        if (!encoder.matches(request.password(), admin.getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }

        String token = jwt.generateToken();

        ResponseCookie cookie = ResponseCookie.from("admin_token", token)
                .httpOnly(true)
                .secure(false) // false for localhost
                .sameSite("Strict")
                .path("/")
                .maxAge(3600)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok().build();
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {

        ResponseCookie cookie = ResponseCookie.from("admin_token", "")
                .path("/")
                .maxAge(0)
                .httpOnly(true)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok().build();
    }


}
