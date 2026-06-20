package com.soum.civikConnect.ngo.dto;

public record ngoReq(
        Long ngoId,

        String officialWebsite,

        String description,

        String address,

        String State,

        boolean isVerified

) {
}
