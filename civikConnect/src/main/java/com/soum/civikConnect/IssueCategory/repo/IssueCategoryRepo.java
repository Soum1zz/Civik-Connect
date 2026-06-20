package com.soum.civikConnect.IssueCategory.repo;

import com.soum.civikConnect.IssueCategory.entity.IssueCategory;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface IssueCategoryRepo extends CrudRepository<IssueCategory,Integer> {
    public Optional<IssueCategory> findByName(String name);
}
