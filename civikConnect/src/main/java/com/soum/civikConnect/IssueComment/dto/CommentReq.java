package com.soum.civikConnect.IssueComment.dto;

import com.soum.civikConnect.CommentImage.entity.CommentImage;
import org.springframework.security.core.userdetails.User;

import java.time.LocalDateTime;

public record CommentReq(
        Long iId,

        Long uId,

        String message
        ) {
}
