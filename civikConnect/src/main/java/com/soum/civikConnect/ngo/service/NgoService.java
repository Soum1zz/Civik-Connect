package com.soum.civikConnect.ngo.service;

import com.soum.civikConnect.IssueCategory.entity.IssueCategory;
import com.soum.civikConnect.IssueInterest.entity.IssueInterest;
import com.soum.civikConnect.IssueInterest.repo.IssueInterestRepo;
import com.soum.civikConnect.issue.entity.Issue;
import com.soum.civikConnect.issue.repo.IssueRepo;
import com.soum.civikConnect.ngo.dto.ngoReq;
import com.soum.civikConnect.ngo.dto.ngoRes;
import com.soum.civikConnect.ngo.entity.Ngo;
import com.soum.civikConnect.ngo.repo.NgoRepo;
import com.soum.civikConnect.user.entity.User;
import com.soum.civikConnect.user.repo.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class NgoService {

    @Autowired
    private NgoRepo ngoRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private IssueInterestRepo issueInterestRepo;

    @Autowired
    private IssueRepo issueRepo;

    private ngoRes toNgoRes(Ngo savedNgo) {
        return new ngoRes(
                savedNgo.getNgoId(),
                savedNgo.getOfficialWebsite(),
                savedNgo.getDescription(),
                savedNgo.getAddress(),
                savedNgo.getState(),
                savedNgo.isVerified()
        );
    }

    //Ngo created
    @Transactional
    public ngoRes createNgo(ngoReq req){
        User user = userRepo.findById(req.ngoId()).orElseThrow(()->new RuntimeException("user not found"));
        Ngo ngo = Ngo.builder()
                .user(user)
                .description(req.description())
                .address(req.address())
                .officialWebsite(req.officialWebsite())
                .isVerified(false)
                .state(req.State())
                .build();

        Ngo savedNgo = ngoRepo.save(ngo);
        return toNgoRes(savedNgo);

    }



    //Ngo det upd
    @Transactional
    public ngoRes updateNgo(ngoReq req){
        Ngo ngo = ngoRepo.findById(req.ngoId()).orElseThrow(()->new RuntimeException("ngo not found"));
        ngo.setDescription(req.description());
        ngo.setAddress(req.address());
        ngo.setOfficialWebsite(req.officialWebsite());

        return toNgoRes(ngoRepo.save(ngo));
    }

    //interest
    @Transactional
    public void issueInterest(Long ngoId, Long issueId){
        Ngo ngo= ngoRepo.findById(ngoId).orElseThrow(()->new RuntimeException("ngo not found"));
        Issue issue= issueRepo.findById(issueId).orElseThrow(()->new RuntimeException("issue not found"));


        IssueInterest issueInterest= new IssueInterest();
        issueInterest.setIssue(issue);
        issueInterest.setNgo(ngo);
        issueInterest.setAppliedAt(LocalDateTime.now());

        issueInterestRepo.save(issueInterest);
    }

    //fetch all issues that are of this ngo's field
    public List<Issue> getRelatedIssues(Long ngoId){
        Ngo ngo= ngoRepo.findById(ngoId).orElseThrow(()->new RuntimeException("ngo not found"));

        List<Issue> issues= new ArrayList<>();

        Set<IssueCategory> ngoCats= ngo.getIssueCategory();
        for(IssueCategory ngoCat:ngoCats)
            issues.addAll(issueRepo.findRelatedIssues(ngoId, ngoCat.toString()));


        return issues;
    }

    //fetch issues of a ngo
    public List<Issue> findAllIssues(Long ngoId){
        List<Issue>issues= new ArrayList<>();

        issues= issueRepo.findAllByAssignedNgoNgoId(ngoId);
        return issues;
    }

}
