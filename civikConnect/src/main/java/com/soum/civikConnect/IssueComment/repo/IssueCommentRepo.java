package com.soum.civikConnect.IssueComment.repo;

import com.soum.civikConnect.IssueComment.entity.IssueComment;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface IssueCommentRepo extends CrudRepository<IssueComment, Long> {
    List<IssueComment> findAllByIssueId(Long iId);
}
