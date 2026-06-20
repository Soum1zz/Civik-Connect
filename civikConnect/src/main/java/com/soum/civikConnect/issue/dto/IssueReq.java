package com.soum.civikConnect.issue.dto;

import com.soum.civikConnect.IssueCategory.entity.IssueCategory;
import com.soum.civikConnect.common.enums.IssueStatus;
import com.soum.civikConnect.ngo.entity.Ngo;
import com.soum.civikConnect.user.entity.User;
import jakarta.persistence.*;

import java.time.LocalDate;

public record IssueReq(
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
