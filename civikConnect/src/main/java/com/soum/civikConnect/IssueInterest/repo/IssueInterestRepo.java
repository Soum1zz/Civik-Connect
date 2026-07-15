package com.soum.civikConnect.IssueInterest.repo;

import com.soum.civikConnect.IssueInterest.entity.IssueInterest;
import com.soum.civikConnect.ngo.entity.Ngo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface IssueInterestRepo extends JpaRepository<IssueInterest, Long> {
    Optional<List<IssueInterest>> findByNgo(Ngo ngo);
}
