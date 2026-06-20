package com.soum.civikConnect.issue.repo;

import com.soum.civikConnect.issue.entity.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueRepo extends JpaRepository<Issue, Long> {
}
