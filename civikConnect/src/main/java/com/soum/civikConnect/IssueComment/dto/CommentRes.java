package com.soum.civikConnect.IssueComment.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record CommentRes(
        Long cId,

        String authorName,

        String message,

        LocalDateTime time,

        String role
) {
}
