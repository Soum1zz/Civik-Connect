package com.soum.civikConnect.moderator.services;

import com.soum.civikConnect.common.enums.IssueStatus;
import com.soum.civikConnect.issue.dto.IssueRes;
import com.soum.civikConnect.issue.entity.Issue;
import com.soum.civikConnect.issue.repo.IssueRepo;
import com.soum.civikConnect.issue.service.IssueService;
import com.soum.civikConnect.ngo.dto.ngoRes;
import com.soum.civikConnect.ngo.entity.Ngo;
import com.soum.civikConnect.ngo.repo.NgoRepo;
import com.soum.civikConnect.user.entity.User;
import com.soum.civikConnect.user.repo.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class moderatorService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private IssueRepo issueRepo;
    @Autowired
    private NgoRepo ngoRepo;
    @Autowired
    private IssueService issueService;

    //verify issue
    @Transactional
    public void verifyIssue(Long id){
        Issue issue= issueRepo.findById(id).orElseThrow(()->new RuntimeException("Issue not found"));

        issue.setStatus(IssueStatus.VERIFIED);
        issueRepo.save(issue);
    }

    //resolve issue
    @Transactional
    public void resolveIssue(Long id){
        Issue issue= issueRepo.findById(id).orElseThrow(()->new RuntimeException("Issue not found"));

        issue.setStatus(IssueStatus.RESOLVED);
        issueRepo.save(issue);
    }

    //reject issue
    @Transactional
    public void rejectIssue(Long id){
        Issue issue= issueRepo.findById(id).orElseThrow(()->new RuntimeException("Issue not found"));

        issue.setStatus(IssueStatus.REJECTED);
        issueRepo.save(issue);
    }

    //assign Issue to a ngo
    @Transactional
    public ResponseEntity<?> assignIssue(Long iId, Long ngoId ){
        //business logic
        Issue issue= issueRepo.findById(iId).orElseThrow(()->new RuntimeException("Issue not found"));
        Ngo ngo= ngoRepo.findById(ngoId).orElseThrow(()->new RuntimeException("ngo not found"));
        if(issue.getStatus()!=IssueStatus.VERIFIED){
            System.out.println("Issue status is "+issue.getStatus());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if(issue.getAssignedNgo()!=null){
            System.out.println("Assigned ngo is "+issue.getAssignedNgo().getUser().getUsername());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        issue.setAssignedNgo(ngo);

        issueRepo.save(issue);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    //ban user
    @Transactional
    public void banUser(Long id ){
        User user= userRepo.findById(id).orElseThrow(()->new RuntimeException("User not found"));

        user.setBlocked(true);
        userRepo.save(user);
    }

    //ban user
    @Transactional
    public void unBanUser(Long id ){
        User user= userRepo.findById(id).orElseThrow(()->new RuntimeException("User not found"));

        user.setBlocked(false);
        userRepo.save(user);
    }

    //verify ngos
    @Transactional
    public void verifyNgo(Long id ){
        Ngo ngo= ngoRepo.findById(id).orElseThrow(()->new RuntimeException("ngo not found"));

        ngo.setVerified(true);
        ngoRepo.save(ngo);
    }

    //fetch all issues that are yet to verify
    public List<IssueRes> findAllNotVerifiedIssues(){
        List<Issue> issues= issueRepo.findByStatus(IssueStatus.UNDER_REVIEW);
        List<IssueRes> issueRes = new ArrayList<>();
        for (Issue issue : issues) {
            issueRes.add(issueService.toIssueRes(issue));
        }
        return issueRes;
    }

    public List<ngoRes> findAllNotVerifiedNgos(){
        List<Ngo> ngos = ngoRepo.findAllNotVerified();
        List<ngoRes> ngoResList = new ArrayList<>();
        for (Ngo ngo : ngos) {
            ngoResList.add(new ngoRes(
                    ngo.getUser().getUsername(),
                    ngo.getUser().getEmail(),
                    ngo.getUser().getPhoneNumber(),
                    ngo.getNgoId(),
                    ngo.getOfficialWebsite(),
                    ngo.getDescription(),
                    ngo.getAddress(),
                    ngo.getState(),
                    ngo.isVerified()
            ));
        }
        return ngoResList;
    }



    //platform analytics







}
