package com.soum.civikConnect.issue.service;

import com.soum.civikConnect.IssueCategory.entity.IssueCategory;
import com.soum.civikConnect.IssueCategory.repo.IssueCategoryRepo;
import com.soum.civikConnect.common.enums.IssueStatus;
import com.soum.civikConnect.issue.dto.IssueReq;
import com.soum.civikConnect.issue.dto.IssueRes;
import com.soum.civikConnect.issue.entity.Issue;
import com.soum.civikConnect.issue.repo.IssueRepo;
import com.soum.civikConnect.issueImg.entity.IssueImg;
import com.soum.civikConnect.issueImg.repo.IssueImgRepo;
import com.soum.civikConnect.ngo.entity.Ngo;
import com.soum.civikConnect.ngo.repo.NgoRepo;
import com.soum.civikConnect.user.entity.User;
import com.soum.civikConnect.user.repo.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class IssueService {
    @Autowired
    IssueRepo issueRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    IssueImgRepo imgRepo;


    @Autowired
    IssueCategoryRepo issueCategoryRepo;

    @Autowired
    NgoRepo ngoRepo;

    public IssueRes toIssueRes(Issue issue){
        IssueRes issueRes1= new IssueRes(
                issue.getReporter().getUserId(),
                issue.getId(),
                issue.getTitle(),
                issue.getStatus().toString(),
                issue.getDescription(),
                issue.getCategory().getName(),
                issue.getLongitude(),
                issue.getLatitude(),
                issue.getCity(),
                issue.getState(),
                issue.getCreatedOn()
        );
        return issueRes1;
    }


    //create
    @Transactional
    public Long createIssue(IssueReq req, Long user_id) throws Exception{

        User user= userRepo.findById(user_id).orElseThrow(()->new RuntimeException("User not found"));
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

        Issue savedIssue= issueRepo.save(issue);
        return savedIssue.getId();

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


    public List<IssueCategory> getAllIssueCategory() {
        return issueCategoryRepo.findAll();
    }

    public IssueRes getIssue(Long issueId) {
        Issue issue= issueRepo.findById(issueId).orElseThrow(()->new RuntimeException("Issue not found"));

        return toIssueRes(issue);
    }

    public List<String> getIssueImg(Long issueId) {
        Issue issue= issueRepo.findById(issueId).orElseThrow(()->new RuntimeException("Issue not found"));
        List <String> imgs= new ArrayList<>();
        List<IssueImg> imgRes = imgRepo.findAllByIssue(issue).orElseThrow(()->new RuntimeException("Issue img not found"));
        for(IssueImg img:imgRes){
            imgs.add(img.getImgUrl());
        }
        return imgs;
    }

    public void setIssueImg(Long userId, Long issueId, List<String> urls) {

        Issue issue= issueRepo.findById(issueId).orElseThrow(()->new RuntimeException("Issue not found"));

        if(!issue.getReporter().getUserId().equals(userId)){
            throw new RuntimeException("You are not allowed to upload images.");
        }

        for (String url : urls) {
            IssueImg issueImg = IssueImg.builder()
                    .issue(issue)
                    .imgUrl(url)
                    .build();
            imgRepo.save(issueImg);
        }
    }

    public List<IssueRes> getIssueByUser(Long userId) {
        User user= userRepo.findById(userId).orElseThrow(()->new RuntimeException("User not found"));

        List<Issue> issues =issueRepo.findAllByReporter(user);

        List<IssueRes> issueRes = new ArrayList<>();

        for (Issue issue : issues) {
            IssueRes issueRes1= toIssueRes(issue);

            issueRes.add(issueRes1);
        }

        return issueRes;

    }

    public List<IssueRes> getOpenIssues(String state) {


        List<Issue> issues= issueRepo.getIssueByState(state);

        List<IssueRes> issueRes = new ArrayList<>();

        for (Issue issue : issues) {
            IssueRes issueRes1=  toIssueRes(issue);
            issueRes.add(issueRes1);
        }
        return issueRes;
    }
}
