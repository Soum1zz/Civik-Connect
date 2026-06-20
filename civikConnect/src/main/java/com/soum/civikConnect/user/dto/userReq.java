package com.soum.civikConnect.user.dto;

public record userReq(
         Long userId,
         String name,
         String email,
         String phoneNumber,
         String password,
         String role
) {
}
