package com.soum.civikConnect.ngo.repo;

import com.soum.civikConnect.ngo.entity.Ngo;
import com.soum.civikConnect.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NgoRepo extends JpaRepository<Ngo,Long> {


    @Query("SELECT n FROM Ngo n WHERE n.isVerified = false")
    List<Ngo> findAllNotVerified();

    @Query(
            """
                SELECT DISTINCT n FROM Ngo n
                LEFT JOIN n.issueCategory c
                WHERE (
                    LOWER(n.user.username) LIKE LOWER(CONCAT('%', :key, '%')) OR
                    LOWER(n.description) LIKE LOWER(CONCAT('%', :key, '%')) OR
                    LOWER(n.address) LIKE LOWER(CONCAT('%', :key, '%')) OR
                    LOWER(n.state) LIKE LOWER(CONCAT('%', :key, '%')) OR
                    LOWER(n.officialWebsite) LIKE LOWER(CONCAT('%', :key, '%')) OR
                    LOWER(c.name) LIKE LOWER(CONCAT('%', :key, '%'))
                )
             """
    )
    List<Ngo> search(@Param("key") String search);

    Optional<Ngo> findByUser(User user);
}
