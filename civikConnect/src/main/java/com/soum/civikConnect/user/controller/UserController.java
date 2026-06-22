package com.soum.civikConnect.user.controller;

import com.soum.civikConnect.IssueComment.dto.CommentReq;
import com.soum.civikConnect.user.dto.userReq;
import com.soum.civikConnect.user.dto.userRes;
import com.soum.civikConnect.user.entity.User;
import com.soum.civikConnect.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


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
    public ResponseEntity<?> updateUser(userReq req){
        try{
            return new ResponseEntity<>(userService.updateUser(req),HttpStatus.OK);
        }catch(Exception e){
            return ResponseEntity.badRequest().build();
        }
    }






}
