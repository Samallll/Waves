package com.waves.userservice.repository;

import com.waves.userservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmailId(String email);

    List<User> findByEmailIdContaining(String email);
}
