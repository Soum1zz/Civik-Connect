package com.soum.civikConnect.moderator.controller;


import com.soum.civikConnect.issue.dto.IssueAssReq;
import com.soum.civikConnect.moderator.services.moderatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mod")
@PreAuthorize("hasRole('MODERATOR')")
public class ModeratorController {
    @Autowired
    private moderatorService moderatorService;

    @PutMapping("/issue/{iId}/verify")
    public ResponseEntity<?> veify(@PathVariable("iId") Long issueId) {
            try{
                moderatorService.verifyIssue(issueId);
            }catch(Exception e){
                return ResponseEntity.badRequest().build();
            }
            return  ResponseEntity.ok().build();
    }

    @PutMapping("/issue/{iId}/resolve")
    public ResponseEntity<?> resolve(@PathVariable("iId") Long issueId) {
        try{
            moderatorService.resolveIssue(issueId);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
        return  ResponseEntity.ok().build();
    }

    @PutMapping("/issue/{iId}/reject")
    public ResponseEntity<?> reject(@PathVariable("iId") Long issueId) {
        try{
            moderatorService.rejectIssue(issueId);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
        return  ResponseEntity.ok().build();
    }

    @PutMapping("/issue/assign")
    public ResponseEntity<?> assign(@RequestBody IssueAssReq req) {
        try{
            moderatorService.assignIssue(req.iId(), req.ngoId());
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
        return  ResponseEntity.ok().build();
    }

    @PutMapping("/user/{uId}/ban")
    public ResponseEntity<?> banUser(@PathVariable("uId") Long uId) {
        try{
            moderatorService.banUser(uId);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
        return  ResponseEntity.ok().build();
    }
    @PutMapping("/user/{uId}/unban")
    public ResponseEntity<?> unbanUser(@PathVariable("uId") Long uId) {
        try{
            moderatorService.unBanUser(uId);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
        return  ResponseEntity.ok().build();
    }
    @PutMapping("/ngo/{ngoId}/verify")
    public ResponseEntity<?> verifyNgo(@PathVariable("ngoId") Long ngoId) {
        try{
            moderatorService.verifyNgo(ngoId);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
        return  ResponseEntity.ok().build();
    }
    @GetMapping("/issue/not-verified")
    public ResponseEntity<?> getNotVeriIssues() {
        try{
            return new ResponseEntity<>(moderatorService.findAllNotVerifiedIssues(), HttpStatus.OK);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

}
