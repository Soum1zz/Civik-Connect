package com.soum.civikConnect.IssueComment.entity;

import com.soum.civikConnect.CommentImage.entity.CommentImage;
import com.soum.civikConnect.issue.entity.Issue;
import com.soum.civikConnect.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IssueComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Issue issue;

    @ManyToOne
    private User author;

    private String message;

    private LocalDateTime createdAt;
}
