package com.soum.civikConnect.user.dto;

public record userRes(
        Long userId,
        String name,
        String email,
        String phoneNumber,

        String role
) {
}
