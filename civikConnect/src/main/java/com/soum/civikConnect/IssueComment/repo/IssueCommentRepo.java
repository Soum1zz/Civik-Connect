package com.soum.civikConnect.IssueComment.repo;

import com.soum.civikConnect.IssueComment.entity.IssueComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IssueCommentRepo extends JpaRepository<IssueComment, Long> {
    List<IssueComment> findAllByIssueId(Long iId);

    Optional<IssueComment> findByIssueId(Long aLong);
}
