package com.soum.civikConnect.ngo.entity;

import com.soum.civikConnect.IssueCategory.entity.IssueCategory;
import com.soum.civikConnect.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ngo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ngoId;

    @OneToOne(cascade = CascadeType.ALL)
    private User user;

    private String officialWebsite;

    private String description;

    @ManyToMany
    private Set<IssueCategory> issueCategory;

    private String address;

    private String state;

    private boolean isVerified;

}
