package com.soum.civikConnect.IssueInterest.entity;

import com.soum.civikConnect.issue.entity.Issue;
import com.soum.civikConnect.ngo.entity.Ngo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class IssueInterest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Issue issue;

    @ManyToOne
    private Ngo ngo;

    private LocalDateTime appliedAt;
}
