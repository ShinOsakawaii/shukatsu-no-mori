package com.shinosaka.shukatsunomori.backend.domain;

import com.shinosaka.shukatsunomori.backend.dto.request.auth.SignupRequest;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    //로그인 ID
    @Column(name = "email", nullable = false, unique = true, length = 255)
    private String email;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Column(name = "nickname", nullable = false, length = 50)
    private String nickname;

    @Column(name = "profile_image", nullable = true)
    private String profileImage;
/*
    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role = Role.USER;
*/
    @CreationTimestamp
    @Column(name = "created_at",  nullable = false,  updatable = false)
    private LocalDateTime createdAt;


    public void updateNickname(String nickname){
        this.nickname = nickname;
    }

    public void updateProfileImage(String profileImage){
        this.profileImage = profileImage;
    }
    public void updatePassword(String password){
        this.password = password;
    }

}