package com.soum.civikConnect.issue.entity;

import com.soum.civikConnect.IssueCategory.entity.IssueCategory;
import com.soum.civikConnect.common.enums.IssueStatus;
import com.soum.civikConnect.ngo.entity.Ngo;
import com.soum.civikConnect.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Issue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;


    
    @ManyToOne
    @JoinColumn(name = "reporter_id")
    private User reporter;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private IssueCategory category;

    @ManyToOne
    @JoinColumn(name = "assigned_ngo_id")
    private Ngo assignedNgo;

    @Column(columnDefinition = "TEXT")
    private String description;



    @Enumerated(EnumType.STRING)
    private IssueStatus status;

    private Double longitude;

    private Double latitude;

    private String city;

    private String state;

    private LocalDate createdOn;
}
