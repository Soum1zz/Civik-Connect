package com.soum.civikConnect.IssueInterest.repo;

import com.soum.civikConnect.IssueInterest.entity.IssueInterest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface IssueInterestRepo extends JpaRepository<IssueInterest, Long> {
}
