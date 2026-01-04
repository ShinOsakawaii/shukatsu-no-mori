package com.shinosaka.shukatsunomori.backend.repository;

import com.shinosaka.shukatsunomori.backend.domain.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {
}