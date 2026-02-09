package com.mbpluslevante.backend.controller;

import com.mbpluslevante.backend.config.CookieProperties;
import com.mbpluslevante.backend.dto.LoginRequestDto;
import com.mbpluslevante.backend.model.Admin;
import com.mbpluslevante.backend.repository.AdminRepository;
import com.mbpluslevante.backend.security.JwtService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@Tag(name = "AuthController")
public class AuthController
{
    private final AdminRepository adminRepository;
    private final JwtService jwt;
    private final BCryptPasswordEncoder encoder;
    private final CookieProperties cookieProperties;

    public AuthController(AdminRepository adminRepository, JwtService jwt, BCryptPasswordEncoder encoder, CookieProperties cookieProperties) {
        this.adminRepository = adminRepository;
        this.jwt = jwt;
        this.encoder = encoder;
        this.cookieProperties = cookieProperties;
    }
    @PostMapping("/login")
    public ResponseEntity<Void> login(@Valid @RequestBody LoginRequestDto request, HttpServletResponse response)
    {
        Admin admin = adminRepository.findByUsername(request.username())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));

        if (!encoder.matches(request.password(), admin.getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }

        String token = jwt.generateToken(
                admin.getUsername(),
                List.of("ADMIN")
        );

        ResponseCookie cookie = ResponseCookie.from("access_token", token)
                .httpOnly(true)
                .secure(cookieProperties.isSecure())
                .sameSite("Lax")
                .path("/")
                .maxAge(jwt.getExpirationSeconds())
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok().build();
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {

        ResponseCookie cookie = ResponseCookie.from("access_token", "")
                .path("/")
                .maxAge(0)
                .httpOnly(true)
                .secure(cookieProperties.isSecure())
                .sameSite("Lax")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication auth) {
        if (auth == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(
                Map.of(
                        "username", auth.getName(),
                        "roles", auth.getAuthorities()
                )
        );
    }



}
