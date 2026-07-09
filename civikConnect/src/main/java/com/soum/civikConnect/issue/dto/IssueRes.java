package com.soum.civikConnect.issue.dto;

import java.time.LocalDate;

public record IssueRes(
        Long  uid,

        Long  issueId,

        String  title,

        String status,

        String description,

        String category,

        Double longitude,

        Double latitude,

        String city,

        String state,

        LocalDate time

) {
}
