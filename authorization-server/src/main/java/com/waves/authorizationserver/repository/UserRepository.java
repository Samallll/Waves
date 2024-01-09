package com.waves.authorizationserver.repository;

import com.waves.authorizationserver.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    User findByEmailId(String emailId);

    User findByRole(String role);
}
