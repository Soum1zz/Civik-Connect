package com.soum.civikConnect.CommentImage.repository;

import com.soum.civikConnect.CommentImage.entity.CommentImage;
import com.soum.civikConnect.IssueComment.entity.IssueComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface commentImageRepo extends JpaRepository<CommentImage,Long> {
    public Optional<List<CommentImage>> findByComment(IssueComment comment);

}
