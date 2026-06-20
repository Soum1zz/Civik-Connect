package com.soum.civikConnect.issue.service;

import com.soum.civikConnect.IssueCategory.entity.IssueCategory;
import com.soum.civikConnect.IssueCategory.repo.IssueCategoryRepo;
import com.soum.civikConnect.common.enums.IssueStatus;
import com.soum.civikConnect.issue.dto.IssueReq;
import com.soum.civikConnect.issue.entity.Issue;
import com.soum.civikConnect.issue.repo.IssueRepo;
import com.soum.civikConnect.user.entity.User;
import com.soum.civikConnect.user.repo.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
public class IssueService {
    @Autowired
    IssueRepo issueRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    IssueCategoryRepo issueCategoryRepo;

    //create
    @Transactional
    public void createIssue(IssueReq req){

        User user= userRepo.findById(req.uid()).orElseThrow(()->new RuntimeException("User not found"));
        IssueCategory cat= issueCategoryRepo.findByName(req.category()).orElseThrow(()->new RuntimeException("Category not found"));

        Issue issue =Issue.builder()
                .city(req.city())
                .createdOn(LocalDate.now())
                .state(req.state())
                .title(req.title())
                .description(req.description())
                .status(IssueStatus.UNDER_REVIEW)
                .reporter(user)
                .longitude(req.longitude())
                .latitude(req.latitude())
                .category(cat)

                .build();

        issueRepo.save(issue);

    }


    //update
    @Transactional
    public void updateIssue(IssueReq req){
        Issue issue= issueRepo.findById(req.issueId()).orElseThrow(()->new RuntimeException("Issue not found"));
        issue.setDescription(req.description());
        issue.setCity(req.city());
        issue.setState(req.state());
        issue.setLatitude(req.latitude());
        issue.setLongitude(req.longitude());
        issue.setDescription(req.description());
        issue.setTitle(req.title());
        issueRepo.save(issue);

    }

    //verify
    public void verifyIssue(Long id){
        Issue  issue = issueRepo.findById(id).orElseThrow(()->new RuntimeException("Issue not found"));

        issue.setStatus(IssueStatus.VERIFIED);
    }



    //reject
    @Transactional
    public  void deleteIssue(Long id){
        Issue  issue = issueRepo.findById(id).orElseThrow(()->new RuntimeException("Issue not found"));

        issueRepo.delete(issue);

    }
    
}
