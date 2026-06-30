package com.soum.civikConnect.ngo.repo;

import com.soum.civikConnect.ngo.entity.Ngo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NgoRepo extends JpaRepository<Ngo,Long> {

    Optional<Ngo> findByUserUserId(Long uId);

    @Query(
            """
                SELECT n FROM Ngo n
                WHERE (
                    LOWER(n.name) LIKE CONCAT('%', :key, '%') OR
                    LOWER(n.description) LIKE CONCAT('%', :key, '%') OR
                    LOWER(n.issueCategory) LIKE CONCAT('%', :key, '%')
                )
             """
    )
    List<Ngo> search(@Param("key") String search);
}
