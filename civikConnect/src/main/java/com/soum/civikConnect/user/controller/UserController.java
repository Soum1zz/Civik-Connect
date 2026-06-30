package com.soum.civikConnect.user.controller;

import com.soum.civikConnect.config.security.UserPrincipal;
import com.soum.civikConnect.user.dto.userReq;
import com.soum.civikConnect.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/all-user")
    public ResponseEntity<?> getAllUser(){
        try{
            return new ResponseEntity<>(userService.getAllUser(),HttpStatus.OK);

        }catch(Exception ex){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/create")
    public ResponseEntity<?> createUser(userReq req){
        try{
            return new ResponseEntity<>(userService.addUser(req),HttpStatus.OK);

        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(userReq req, @AuthenticationPrincipal UserPrincipal principal){
        try{
            return new ResponseEntity<>(userService.updateUser(req, principal.getUser().getUserId()),HttpStatus.OK);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@AuthenticationPrincipal UserPrincipal principal){
        try{
            userService.deleteUser(principal.getUser().getUserId());
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }



}
