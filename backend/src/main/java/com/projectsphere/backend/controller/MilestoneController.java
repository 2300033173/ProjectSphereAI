package com.projectsphere.backend.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.*;

import com.projectsphere.backend.entity.Milestone;

@RestController
@RequestMapping("/milestones")
@CrossOrigin(origins = "*")
public class MilestoneController {

    private final List<Milestone> milestones = new ArrayList<>();

    private Long nextId = 1L;

    // ==========================
    // Get All Milestones
    // ==========================

    @GetMapping
    public List<Milestone> getMilestones() {
        return milestones;
    }

    // ==========================
    // Get Student Milestones
    // ==========================

    @GetMapping("/student/{studentId}")
    public List<Milestone> getStudentMilestones(
            @PathVariable Long studentId) {

        return milestones.stream()
                .filter(m ->
                        m.getStudentId() != null &&
                        m.getStudentId().equals(studentId))
                .collect(Collectors.toList());
    }

    // ==========================
    // Add Milestone
    // ==========================

    @PostMapping
    public Milestone addMilestone(
            @RequestBody Milestone milestone) {

        milestone.setId(nextId++);

        milestones.add(milestone);

        return milestone;
    }

    // ==========================
    // Delete Milestone
    // ==========================

    @DeleteMapping("/{id}")
    public String deleteMilestone(
            @PathVariable Long id) {

        milestones.removeIf(m -> id.equals(m.getId()));

        return "Milestone Deleted Successfully";
    }

}