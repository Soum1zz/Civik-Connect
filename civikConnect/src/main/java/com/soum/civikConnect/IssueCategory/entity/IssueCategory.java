package com.soum.civikConnect.IssueCategory.entity;


import jakarta.persistence.*;
import org.hibernate.validator.constraints.UniqueElements;

@Entity
public class IssueCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(unique = true)
    private String name;
}
