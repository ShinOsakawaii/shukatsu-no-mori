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
    @Column(name = "review_id", nullable = false)
    private Long reviewId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    //oracle 예약어(자체 명령어)로 인해 db오류가 심해 position 대신 다른 단어로 대체 하였습니다.
    @Column(name = "job_position", nullable = false, length = 50) // "position" 대신 변경
    private String position;

    @Column(name = "content", nullable = false, length = 4000)
    private String content;

    @Column(name = "stage", nullable = false, length = 20)
    private String stage;

    //oracle 예약어(자체 명령어)로 인해 db오류가 심해 result 대신 다른 단어로 대체 하였습니다.
    @Column(name = "job_result", nullable = false, length = 20)   // "result" 대신 변경
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
