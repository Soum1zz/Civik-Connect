package com.soum.civikConnect.ngo.controller;

import com.soum.civikConnect.config.security.UserPrincipal;
import com.soum.civikConnect.moderator.services.moderatorService;
import com.soum.civikConnect.ngo.dto.ngoReq;
import com.soum.civikConnect.ngo.service.NgoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ngo")
@PreAuthorize("hasRole('NGO')")
public class NgoController {

    @Autowired
    private NgoService ngoService;


    @GetMapping("/my-ngo")
    public ResponseEntity<?> getNgoById(@AuthenticationPrincipal UserPrincipal principal ){
        try{
            return new ResponseEntity<>(ngoService.getNgoById(principal.getUser()), HttpStatus.OK);
        }catch(Exception ex){
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/ngo/update")
    public ResponseEntity<?> update(@AuthenticationPrincipal UserPrincipal principal ,@RequestBody ngoReq req) {
        try{
            return new ResponseEntity<>(ngoService.updateNgo(principal.getUser().getUserId(),req),HttpStatus.OK);
        }catch(Exception e){
        return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/issue/{iId}/show-interest")
    public ResponseEntity<?> showInterest(@AuthenticationPrincipal UserPrincipal principal, @PathVariable("iId") Long iId) {
        try{
            ngoService.issueInterest(principal.getUser().getUserId(), iId);
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
        return  ResponseEntity.ok().build();
    }

    @GetMapping("/issue/all-interests")
    public ResponseEntity<?> getAllInterests(@AuthenticationPrincipal UserPrincipal principal){
        try{
            return new ResponseEntity<>(ngoService.findAllInterests(principal.getUser()) , HttpStatus.OK);
        }catch(Exception ex){
            ex.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }


    @GetMapping("/{ngoId}/all-issues")
    public ResponseEntity<?> findNgoIssues(@PathVariable("ngoId") Long ngoId) {
        try{
            return new ResponseEntity<>(ngoService.findAllIssues(ngoId), HttpStatus.OK);

        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }




}
