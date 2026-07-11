package com.soum.civikConnect.common.controller;

import com.soum.civikConnect.IssueCategory.entity.IssueCategory;
import com.soum.civikConnect.config.security.UserPrincipal;
import com.soum.civikConnect.issue.dto.IssueRes;
import com.soum.civikConnect.issue.service.IssueService;
import com.soum.civikConnect.ngo.entity.Ngo;
import com.soum.civikConnect.ngo.service.NgoService;
import com.soum.civikConnect.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/search")
public class SearchController {
    @Autowired
    private NgoService ngoService;
    @Autowired
    private IssueService issueService;
    @Autowired
    private UserService userService;
    @GetMapping("/all-ngo")
    public ResponseEntity<List<Ngo>> getAllNgo(){
        try{
            return new ResponseEntity<>(ngoService.getAllNgo(), HttpStatus.OK);
        }catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/ngo/{ngoId}/all-categories")
    public ResponseEntity<?> catFields(@PathVariable("ngoId") Long ngoId) {
        try{
            return new ResponseEntity<>(ngoService.getIssueCats(ngoId), HttpStatus.OK);

        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/{uid}/user-name")
    public ResponseEntity<?> getUserName(@PathVariable("uid") Long uid){
        try{
            return new ResponseEntity<>(userService.getUserName(uid),HttpStatus.OK);
        }catch (Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }


    @GetMapping("/issue-categories")
    public ResponseEntity<List<IssueCategory>> getAllCategories(){
        try{
            return new ResponseEntity<>(issueService.getAllIssueCategory(),HttpStatus.OK);
        }catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/ngo/search")
    public ResponseEntity<List<Ngo>> searchNgo(@RequestParam String search){
        try{
            return new ResponseEntity<>(ngoService.searchNgo(search), HttpStatus.OK);
        }catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/issue/open-issues")
    public ResponseEntity<List<IssueRes>> getOpenIssues(@RequestParam String state){
        try{
            return new ResponseEntity<>(issueService.getOpenIssues(state), HttpStatus.OK);
        }catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }
}
