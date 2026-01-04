package com.shinosaka.shukatsunomori.backend.repository;

import com.shinosaka.shukatsunomori.backend.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    //로그인시 이메일로 회원 찾기
    Optional<User> findByEmail(String email);
    //회원 가입시 이메일 중복 체크
    boolean existsByEmail(String email);
}
