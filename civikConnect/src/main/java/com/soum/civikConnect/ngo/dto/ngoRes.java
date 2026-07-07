package com.soum.civikConnect.ngo.dto;

public record ngoRes(

        String name,

        String email,

        String phone,

        Long ngoId,

        String officialWebsite,

        String description,

        String address,

        String State,

        boolean isVerified
) {
}
