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
@Table(name = "company")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "company_seq_gen")
    @Column(name = "company_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private Location location;

    @Column(length = 100, nullable = false)
    private String name;

    @Column(name = "company_image")
    private String companyImage;

    @Column(length = 50, nullable = false)
    private String industry;

    private String website;

    @Lob
    private String description;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public void update(
            Location location,
            String name,
            String industry,
            String website,
            String description,
            String companyImage) {
        this.location = location;
        this.name = name;
        this.industry = industry;
        this.website = website;
        this.description = description;
        this.companyImage = companyImage;
    }
}