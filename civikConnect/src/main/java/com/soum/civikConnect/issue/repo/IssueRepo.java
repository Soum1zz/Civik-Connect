package com.soum.civikConnect.issue.repo;

import com.soum.civikConnect.issue.dto.IssueRes;
import com.soum.civikConnect.issue.entity.Issue;
import com.soum.civikConnect.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IssueRepo extends JpaRepository<Issue, Long> {

    public List<Issue> findAllByAssignedNgoNgoId(long id);

    @Query("""
    SELECT i
    FROM Issue i
    WHERE i.assignedNgo IS NULL
      AND i.state = :state
      AND i.category.id IN (
            SELECT c.id
            FROM Ngo n
            JOIN n.issueCategory c
            WHERE n.ngoId = :ngoId
      )
""")
    List<Issue> findRelatedIssues(
            @Param("ngoId") Long ngoId,
            @Param("state") String state
    );

    List<Issue> findByStatus(com.soum.civikConnect.common.enums.IssueStatus status);

    List<Issue> findAllByReporter(User user);


    @Query("""
    SELECT i
    FROM Issue i
    WHERE i.state = :state
    """)
    List<Issue> getIssueByState(@Param("state") String state);
}
