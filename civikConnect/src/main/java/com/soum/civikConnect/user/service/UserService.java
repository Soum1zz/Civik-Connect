package com.soum.civikConnect.user.service;

import com.soum.civikConnect.IssueComment.dto.CommentReq;
import com.soum.civikConnect.common.enums.UserRole;
import com.soum.civikConnect.user.dto.userReq;
import com.soum.civikConnect.user.dto.userRes;
import com.soum.civikConnect.user.entity.User;
import com.soum.civikConnect.user.repo.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    public userRes toUserResponse(User user){
        userRes userResponse = new userRes(
                user.getUserId(),
                user.getUsername(),
                user.getEmail(),
                user.getPhoneNumber(),
                String.valueOf(user.getRole())
        );
        return userResponse;
    }



    public List<userRes> getAllUser() {
        List<userRes> users = new ArrayList<>();
        List<User> userList = userRepo.findAll();
        for (User user : userList) {
            users.add(toUserResponse(user));
        }
        return users;
    }

    public userRes getUser(Long userId) {
        User user= userRepo.findById(userId).orElseThrow(()->new RuntimeException("User Not Found"));
        return toUserResponse(user);
    }

    public userRes addUser(userReq user) throws IOException {
        User user1= new User();
        user1.setUsername(user.name());
        user1.setPassword(bCryptPasswordEncoder.encode(user.password()));
        user1.setEmail(user.email());
        user1.setPhoneNumber(user.phoneNumber());
        user1.setCreatedOn(LocalDateTime.now());
        user1.setBlocked(false);
        try {
            user1.setRole(UserRole.valueOf(user.role().toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role");
        }

        User savedUser=userRepo.save(user1);


        return toUserResponse(savedUser);
    }

    public userRes updateUser(userReq user, Long uid) throws IOException {
        User user1= userRepo.findById(uid).orElseThrow(()->new RuntimeException("User Not Found"));
        user1.setUsername(user.name());
        user1.setEmail(user.email());
        user1.setPhoneNumber(user.phoneNumber());
        User updatedUser=userRepo.save(user1);
        return toUserResponse(updatedUser);
    }

    public void deleteUser(Long userId) {
        User user= userRepo.findById(userId).orElseThrow(()->new RuntimeException("User Not Found"));

        userRepo.deleteById(user.getUserId());
    }

    public String getImage(Long userId) {
        User user= userRepo.findById(userId).orElseThrow(()->new RuntimeException("User not found"));
        return user.getImgUrl();
    }
    @Transactional
    public void putImage(Long userId, String imageUrl) {
        if(imageUrl==null || imageUrl.isEmpty()) return;
        imageUrl=imageUrl.replace("\"","");
        User user= userRepo.findById(userId).orElseThrow(()->new RuntimeException("User not found"));
        user.setImgUrl(imageUrl);
    }


    public String getUserName(Long uid) {
        return userRepo.findById(uid).orElseThrow(()-> new RuntimeException("User not found")).getUsername();
    }
}
