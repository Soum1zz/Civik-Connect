package com.soum.civikConnect.ngo.controller;

import com.soum.civikConnect.moderator.services.moderatorService;
import com.soum.civikConnect.ngo.dto.ngoReq;
import com.soum.civikConnect.ngo.service.NgoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ngo")
@PreAuthorize("hasRole('NGO')")
public class NgoController {

    @Autowired
    private NgoService ngoService;

    @PutMapping("/ngo/create")
    public ResponseEntity<?> create(@RequestBody ngoReq req) {
        try{
            return new ResponseEntity<>(ngoService.createNgo(req), HttpStatus.CREATED);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/ngo/update")
    public ResponseEntity<?> update(@RequestBody ngoReq req) {
        try{
            return new ResponseEntity<>(ngoService.updateNgo(req),HttpStatus.OK);
        }catch(Exception e){
        return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/ngo/{ngoId}/show-interest/{iId}")
    public ResponseEntity<?> showInterest(@RequestParam("ngoId") Long ngoId, @RequestParam("iId") Long iId) {
        try{
            ngoService.issueInterest(ngoId, iId);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
        return  ResponseEntity.ok().build();
    }

    @GetMapping("/ngo/{ngoId}/all-categories")
    public ResponseEntity<?> catFields(@RequestParam("ngoId") Long ngoId) {
        try{
            return new ResponseEntity<>(ngoService.getRelatedIssues(ngoId), HttpStatus.OK);

        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/ngo/{ngoId}/all-issues")
    public ResponseEntity<?> findNgoIssues(@RequestParam("ngoId") Long ngoId) {
        try{
            return new ResponseEntity<>(ngoService.findAllIssues(ngoId), HttpStatus.OK);

        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }




}
