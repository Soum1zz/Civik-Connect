package com.soum.civikConnect.IssueComment.controller;

import com.soum.civikConnect.IssueComment.dto.CommentReq;
import com.soum.civikConnect.IssueComment.service.IssueCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

public class IssueCommentController {
    @Autowired
    private IssueCommentService issueCommentService;

    @GetMapping("/{iId}/comment/all")
    public ResponseEntity<?> getAllComment(@RequestParam("iId") Long iId){
        try{
            return new ResponseEntity<>(issueCommentService.allComment(iId), HttpStatus.OK);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }


    @PutMapping("/comment/create")
    public ResponseEntity<?> createComment(CommentReq req){
        try{
            issueCommentService.createComment(req);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
        return  ResponseEntity.ok().build();
    }

    @PutMapping("/comment/update")
    public ResponseEntity<?> updateComment(CommentReq req){
        try{
            issueCommentService.updateComment(req);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
        return  ResponseEntity.ok().build();
    }

    @DeleteMapping("/comment/{cId}/delete")
    public ResponseEntity<?> createComment(@RequestParam("cId") Long cId){
        try{
            issueCommentService.deleteComment(cId);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
        return  ResponseEntity.ok().build();
    }
    //upload image

}
