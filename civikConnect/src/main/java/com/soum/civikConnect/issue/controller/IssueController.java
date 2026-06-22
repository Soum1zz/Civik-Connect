package com.soum.civikConnect.issue.controller;


import com.soum.civikConnect.issue.dto.IssueReq;
import com.soum.civikConnect.issue.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("issue")
public class IssueController {

    @Autowired
    private IssueService issueService;



    @PutMapping("/create")
    public ResponseEntity<?> createIssue(@RequestBody IssueReq req) {
        try{
            issueService.createIssue(req);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
        return  ResponseEntity.ok().build();
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
