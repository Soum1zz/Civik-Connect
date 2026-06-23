package com.soum.civikConnect.auth.controller;



import com.soum.civikConnect.auth.dto.AuthResponse;
import com.soum.civikConnect.auth.dto.LoginReq;
import com.soum.civikConnect.config.security.UserPrincipal;
import com.soum.civikConnect.config.service.JwtService;
import com.soum.civikConnect.user.dto.userReq;
import com.soum.civikConnect.user.dto.userRes;
import com.soum.civikConnect.user.entity.User;
import com.soum.civikConnect.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtService jwtService;

    @GetMapping("/me")
    public ResponseEntity<userRes> getMe(@AuthenticationPrincipal UserPrincipal principal){
        User user= principal.getUser();


        return  new ResponseEntity<>(new userRes(
                user.getUserId(),
                user.getUsername(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getRole().name()


        ), HttpStatus.OK) ;
    }

    @PostMapping("/register")
    public ResponseEntity<userRes> addUser(@RequestBody userReq user ) throws IOException {
        return new ResponseEntity<>(userService.addUser(user),HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginReq req){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        req.email(),
                        req.password()
                )
        );
        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        String token = jwtService.generateToken(principal.getUser());
        String role = principal.getUser().getRole().name();
        return ResponseEntity.ok(new AuthResponse(token,role));
    }

}
