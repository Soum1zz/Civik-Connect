package com.soum.civikConnect.ngo.dto;

public record ngoRes(
        Long ngoId,

        String officialWebsite,

        String description,

        String address,

        String State,

        boolean isVerified
) {
}
