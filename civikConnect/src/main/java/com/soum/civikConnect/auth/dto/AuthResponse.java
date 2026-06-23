package com.soum.civikConnect.auth.dto;

public record AuthResponse(
        String token,
        String role
        ) {
}
