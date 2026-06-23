package com.soum.civikConnect.ngo.repo;

import com.soum.civikConnect.ngo.entity.Ngo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NgoRepo extends JpaRepository<Ngo,Long> {

    Optional<Ngo> findByUserUserId(Long uId);
}
