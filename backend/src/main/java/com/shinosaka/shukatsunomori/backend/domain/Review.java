package com.shinosaka.shukatsunomori.backend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "company_review")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long reviewId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "position", nullable = false, length = 50)
    private String position;

    @Column(name = "content", nullable = false, length = 4000)
    private String content;

    @Column(name = "stage", nullable = false, length = 20)
    private String stage;

    @Column(name = "result", nullable = false, length = 20)
    private String result;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "update_at")
    private LocalDateTime updateAt;

    public void update(String title,String position, String content,String stage,String result){
        this.title = title;
        this.position = position;
        this.content = content;
        this.stage = stage;
        this.result = result;
    }
}
