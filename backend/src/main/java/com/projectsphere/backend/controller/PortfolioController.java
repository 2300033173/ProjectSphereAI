package com.projectsphere.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.projectsphere.backend.entity.Portfolio;
import com.projectsphere.backend.repository.PortfolioRepository;

@RestController
@RequestMapping("/portfolio")
@CrossOrigin("*")
public class PortfolioController {

    @Autowired
    private PortfolioRepository repository;

    @GetMapping
    public List<Portfolio> getPortfolio() {
        return repository.findAll();
    }

    @PostMapping
    public Portfolio addPortfolio(
            @RequestBody Portfolio portfolio) {

        return repository.save(portfolio);
    }

    @GetMapping("/{id}")
    public Portfolio getPortfolioById(
            @PathVariable Long id) {

        return repository.findById(id)
                .orElse(null);
    }

    @PutMapping("/{id}")
    public Portfolio updatePortfolio(
            @PathVariable Long id,
            @RequestBody Portfolio updatedPortfolio) {

        Portfolio portfolio =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Portfolio Not Found"));

        portfolio.setStudentId(
                updatedPortfolio.getStudentId());

        portfolio.setStudentName(
                updatedPortfolio.getStudentName());

        portfolio.setSkills(
                updatedPortfolio.getSkills());

        portfolio.setGithub(
                updatedPortfolio.getGithub());

        portfolio.setLinkedin(
                updatedPortfolio.getLinkedin());

        portfolio.setPortfolioUrl(
                updatedPortfolio.getPortfolioUrl());

        portfolio.setResume(
                updatedPortfolio.getResume());

        portfolio.setPortfolioFile(
                updatedPortfolio.getPortfolioFile());

        portfolio.setScreenshot(
                updatedPortfolio.getScreenshot());

        portfolio.setPortfolioScore(
                updatedPortfolio.getPortfolioScore());

        return repository.save(portfolio);
    }

    @DeleteMapping("/{id}")
    public String deletePortfolio(
            @PathVariable Long id) {

        repository.deleteById(id);

        return "Portfolio Deleted Successfully";
    }
    @GetMapping("/student/{studentId}")
    public List<Portfolio> getPortfolioByStudent(
            @PathVariable Long studentId) {

        return repository.findAll()
                .stream()
                .filter(p ->
                    p.getStudentId() != null &&
                    p.getStudentId().equals(studentId))
                .toList();
    }
}