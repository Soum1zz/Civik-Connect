package com.soum.civikConnect.IssueComment.service;


import com.soum.civikConnect.CommentImage.repository.commentImageRepo;
import com.soum.civikConnect.IssueComment.dto.CommentReq;
import com.soum.civikConnect.IssueComment.entity.IssueComment;
import com.soum.civikConnect.IssueComment.repo.IssueCommentRepo;
import com.soum.civikConnect.issue.entity.Issue;
import com.soum.civikConnect.issue.repo.IssueRepo;
import com.soum.civikConnect.user.entity.User;
import com.soum.civikConnect.user.repo.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class IssueCommentService {
    @Autowired
    private IssueCommentRepo issueCommentRepo;
    @Autowired
    private IssueRepo issueRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private commentImageRepo commentImageRepo;

    @Transactional
    public void createComment(CommentReq req) {
        Issue issue= issueRepo.findById(req.iId()).orElseThrow(()->new RuntimeException("Issue Not Found"));

        User user= userRepo.findById(req.uId()).orElseThrow(()->new RuntimeException("User Not Found"));

        IssueComment issueComment = new IssueComment();
        issueComment.setIssue(issue);
        issueComment.setAuthor(user);
        issueComment.setMessage(req.message());
        issueComment.setCreatedAt(LocalDateTime.now());

        issueCommentRepo.save(issueComment);

    }
    //??
    public void updateComment(CommentReq req) {
        Issue issue= issueRepo.findById(req.iId()).orElseThrow(()->new RuntimeException("Issue Not Found"));

        IssueComment issueComment = new IssueComment();
        issueComment.setIssue(issue);
        issueComment.setMessage(req.message());

        issueCommentRepo.save(issueComment);

    }

    public void deleteComment(Long cId) {
        IssueComment comment= issueCommentRepo.findById(cId).orElseThrow(()->new RuntimeException("comment Not Found"));
        issueCommentRepo.deleteById(cId);
    }

    public List<IssueComment> allComment(Long iId) {
        Issue issue= issueRepo.findById(iId).orElseThrow(()->new RuntimeException("Issue Not Found"));

        return issueCommentRepo.findAllByIssueId(iId);
    }


    //comment image
    public List<String> getImage(Long cId) {
        List<String> list= commentImageRepo.findByCommentId(cId).orElseThrow(()->new RuntimeException("User not found"));
        return list;
    }

}
