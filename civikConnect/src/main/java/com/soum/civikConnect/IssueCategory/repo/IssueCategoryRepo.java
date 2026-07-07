package com.soum.civikConnect.IssueCategory.repo;

import com.soum.civikConnect.IssueCategory.entity.IssueCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IssueCategoryRepo extends JpaRepository<IssueCategory,Integer> {
    public Optional<IssueCategory> findByName(String name);

    public Optional<List<IssueCategory>> findById(Long id);
}
