package com.soum.civikConnect.issue.dto;

public record IssueRes(
        Long  uid,

        Long  issueId,

        String  title,

        String description,

        String category,

        Double longitude,

        Double latitude,

        String city,

        String state
) {
}
