package com.projectsphere.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.projectsphere.backend.entity.Portfolio;

public interface PortfolioRepository
        extends JpaRepository<Portfolio, Long> {
}