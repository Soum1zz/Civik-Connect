package com.soum.civikConnect.issueImg.repo;

import com.soum.civikConnect.issue.entity.Issue;
import com.soum.civikConnect.issueImg.entity.IssueImg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface IssueImgRepo extends JpaRepository<IssueImg, Long> {
    Optional<List<IssueImg>> findAllByIssue(Issue issue);
}
