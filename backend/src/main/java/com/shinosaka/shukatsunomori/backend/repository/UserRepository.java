package com.shinosaka.shukatsunomori.backend.repository;

import com.shinosaka.shukatsunomori.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
