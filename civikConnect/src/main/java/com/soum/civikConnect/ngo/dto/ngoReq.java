package com.soum.civikConnect.ngo.dto;

import java.util.Set;

public record ngoReq(
        Long ngoId,

        String officialWebsite,

        String description,

        String address,

        String State,

        Set<Integer> categoriesId
) {
}
