package com.soum.civikConnect.CommentImage.repository;

import com.soum.civikConnect.CommentImage.entity.CommentImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface commentImageRepo extends JpaRepository<CommentImage,Long> {
    public Optional<List<String>> findByCommentId(Long userId);
}
