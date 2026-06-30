package com.soum.civikConnect.common.controller;

import com.soum.civikConnect.ngo.entity.Ngo;
import com.soum.civikConnect.ngo.service.NgoService;
import com.soum.civikConnect.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/search")
public class SearchController {
    @Autowired
    private NgoService ngoService;

    @GetMapping("/all-ngo")
    public ResponseEntity<List<Ngo>> getAllNgo(){
        try{
            return new ResponseEntity<>(ngoService.getAllNgo(), HttpStatus.OK);
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
}
