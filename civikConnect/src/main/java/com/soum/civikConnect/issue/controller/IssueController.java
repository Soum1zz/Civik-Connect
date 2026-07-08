package com.soum.civikConnect.issue.controller;


import com.soum.civikConnect.common.dto.ImgReq;
import com.soum.civikConnect.config.security.UserPrincipal;
import com.soum.civikConnect.issue.dto.IssueReq;
import com.soum.civikConnect.issue.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/issue")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @GetMapping("/{issueId}/get-issue")
    public ResponseEntity<?> getIssue(@PathVariable("issueId") Long issueId){
        try{
            return new ResponseEntity<>(issueService.getIssue(issueId), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{issueId}/get-issue-img")
    public ResponseEntity<?> getIssueImg(@PathVariable("issueId") Long issueId){
        try{
            return new ResponseEntity<>(issueService.getIssueImg(issueId), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/{issueId}/set-issue-img")
    public ResponseEntity<?> setIssueImg(@AuthenticationPrincipal UserPrincipal principal, @PathVariable ("issueId") Long issueid, @RequestBody List<String> urls){
        try{
            issueService.setIssueImg(principal.getUser().getUserId(), issueid, urls );
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }



    @PutMapping("/create")
    public ResponseEntity<?> createIssue(@RequestBody IssueReq req, @AuthenticationPrincipal UserPrincipal principal) {
        try{
            return new ResponseEntity<>(issueService.createIssue(req, principal.getUser().getUserId()), HttpStatus.CREATED);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateIssue(@RequestBody IssueReq req) {
        try{
            issueService.updateIssue(req);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
        return  ResponseEntity.ok().build();
    }


}
