package com.soum.civikConnect.IssueComment.service;


import com.soum.civikConnect.CommentImage.entity.CommentImage;
import com.soum.civikConnect.CommentImage.repository.commentImageRepo;
import com.soum.civikConnect.IssueComment.dto.CommentReq;
import com.soum.civikConnect.IssueComment.dto.CommentRes;
import com.soum.civikConnect.IssueComment.entity.IssueComment;
import com.soum.civikConnect.IssueComment.repo.IssueCommentRepo;
import com.soum.civikConnect.common.dto.ImgReq;
import com.soum.civikConnect.issue.entity.Issue;
import com.soum.civikConnect.issue.repo.IssueRepo;
import com.soum.civikConnect.user.entity.User;
import com.soum.civikConnect.user.repo.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sound.midi.Soundbank;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
    public Long createComment(CommentReq req, Long userId) {
        Issue issue= issueRepo.findById(req.iId()).orElseThrow(()->new RuntimeException("Issue Not Found"));

        User user= userRepo.findById(userId).orElseThrow(()->new RuntimeException("User Not Found"));

        IssueComment issueComment = new IssueComment();
        issueComment.setIssue(issue);
        issueComment.setAuthor(user);
        issueComment.setMessage(req.message());
        issueComment.setCreatedAt(LocalDateTime.now());

        return issueCommentRepo.save(issueComment).getId();

    }
    //??
    public void updateComment(CommentReq req, Long userId) {
        IssueComment comment= issueCommentRepo.findByIssueId(req.iId()).orElseThrow(()->new RuntimeException("comment Not Found"));
        if(userId != comment.getAuthor().getUserId()) {
            System.out.println("Not same user!!");
            return;
        }
        comment.setMessage(req.message());

    }

    public void deleteComment(Long cId, Long userId) {
        IssueComment comment= issueCommentRepo.findById(cId).orElseThrow(()->new RuntimeException("comment Not Found"));
        if(userId != comment.getAuthor().getUserId()) {
            System.out.println("Not same user!!");
            return;
        }
        issueCommentRepo.deleteById(cId);
    }

    public List<CommentRes> allComment(Long iId) {
        Issue issue= issueRepo.findById(iId).orElseThrow(()->new RuntimeException("Issue Not Found"));

        List<IssueComment> comments=  issueCommentRepo.findAllByIssueId(iId);
        List<CommentRes> res= new ArrayList<>();
        for (IssueComment comment : comments) {
            String author = comment.getAuthor().getUsername();
            String role = comment.getAuthor().getRole().toString();
            res.add(
                    new  CommentRes(
                            comment.getId(),
                            author,
                            comment.getMessage(),
                            comment.getCreatedAt(),
                            role
                    )
            );

        }
        return  res;
    }


    //comment image
    public List<String> getImage(Long cId) {
        IssueComment comment= issueCommentRepo.findById(cId).orElseThrow(()->new RuntimeException("comment Not Found"));

        List<String> list= new ArrayList<>();
        List<CommentImage> commentImages= commentImageRepo.findByComment(comment).orElseThrow(()->new RuntimeException("comment img Not Found"));
        for (CommentImage commentImage : commentImages) {
            list.add(commentImage.getImgUrl());
        }

        return list;
    }


    @Transactional
    public void addComImg(ImgReq req, Long userId) {
        IssueComment comment= issueCommentRepo.findById(req.id()).orElseThrow(()->new RuntimeException("comment Not Found"));

        if(userId != comment.getAuthor().getUserId()) {
            System.out.println("Not same user!!");
            return;
        }

        User user= userRepo.findById(userId).orElseThrow(()->new RuntimeException("User Not Found"));

        CommentImage commentImage= CommentImage.builder()
                .comment(comment)
                .imgUrl(req.url())
                .build();

        commentImageRepo.save(commentImage);

    }

    @Transactional
    public void delComImg(ImgReq req, Long userId) {
        issueCommentRepo.deleteById(req.id());

    }



}
