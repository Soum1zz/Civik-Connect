package com.soum.civikConnect.IssueComment.controller;

import com.soum.civikConnect.IssueComment.dto.CommentReq;
import com.soum.civikConnect.IssueComment.service.IssueCommentService;
import com.soum.civikConnect.common.dto.ImgReq;
import com.soum.civikConnect.config.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/comment")

public class IssueCommentController {
    @Autowired
    private IssueCommentService issueCommentService;

    @GetMapping("/{iId}/all")
    public ResponseEntity<?> getAllComment(@PathVariable("iId") Long iId){
        try{
            return new ResponseEntity<>(issueCommentService.allComment(iId), HttpStatus.OK);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }


    @PutMapping("/create")
    public ResponseEntity<?> createComment(@RequestBody CommentReq req, @AuthenticationPrincipal UserPrincipal user){
        try{
            System.out.println(user);
            return new ResponseEntity<>(issueCommentService.createComment(req, user.getUser().getUserId()),HttpStatus.OK);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateComment(@RequestBody CommentReq req,  @AuthenticationPrincipal UserPrincipal user){
        try{
            issueCommentService.updateComment(req, user.getUser().getUserId());
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
        return  ResponseEntity.ok().build();
    }

    @DeleteMapping("/{cId}/delete")
    public ResponseEntity<?> deleteComment(@PathVariable("cId") Long cId, @AuthenticationPrincipal UserPrincipal user){
        try{
            issueCommentService.deleteComment(cId, user.getUser().getUserId());
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
        return  ResponseEntity.ok().build();
    }
    //upload image
    @PutMapping("/image/upload")
    public ResponseEntity<?> uploadCommentImg(@RequestBody ImgReq req , @AuthenticationPrincipal UserPrincipal user){
        try{
            issueCommentService.addComImg(req, user.getUser().getUserId());
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
        return  ResponseEntity.ok().build();
    }

    @DeleteMapping("/image/delete")
    public ResponseEntity<?> deleteCommentImg(@RequestBody ImgReq req , @AuthenticationPrincipal UserPrincipal user){
        try{
            issueCommentService.delComImg(req, user.getUser().getUserId());
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
        return  ResponseEntity.ok().build();
    }

    @GetMapping("/{cId}/image/get-all")
    public ResponseEntity<?> getAllCommentImg(@PathVariable Long cId ){
        try{
            return new ResponseEntity<>(issueCommentService.getImage(cId), HttpStatus.OK);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }


}
