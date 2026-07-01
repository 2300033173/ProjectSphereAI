package com.projectsphere.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.projectsphere.backend.entity.Project;
import com.projectsphere.backend.repository.ProjectRepository;

@RestController
@RequestMapping("/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    @Autowired
    private ProjectRepository repository;

    @GetMapping
    public List<Project> getProjects() {
        return repository.findAll();
    }

    @PostMapping
    public Project addProject(@RequestBody Project project) {

        if (project.getReviewStatus() == null) {
            project.setReviewStatus("Pending");
        }

        return repository.save(project);
    }

    @GetMapping("/{id}")
    public Project getProjectById(@PathVariable Long id) {

        return repository.findById(id).orElse(null);
    }

    @GetMapping("/student/{studentId}")
    public List<Project> getProjectsByStudent(@PathVariable Long studentId) {

        return repository.findAll()
                .stream()
                .filter(project ->
                        project.getStudentId() != null &&
                        project.getStudentId().equals(studentId))
                .toList();
    }

    @PutMapping("/{id}")
    public Project updateProject(
            @PathVariable Long id,
            @RequestBody Project updatedProject) {

        Project project = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project Not Found"));

        project.setStudentId(updatedProject.getStudentId());
        project.setStudentName(updatedProject.getStudentName());
        project.setTitle(updatedProject.getTitle());
        project.setDescription(updatedProject.getDescription());
        project.setTechnology(updatedProject.getTechnology());
        project.setCategory(updatedProject.getCategory());
        project.setStatus(updatedProject.getStatus());
        project.setProgress(updatedProject.getProgress());
        project.setGithubLink(updatedProject.getGithubLink());
        project.setDemoLink(updatedProject.getDemoLink());
        project.setProjectImage(updatedProject.getProjectImage());
        project.setProjectPdf(updatedProject.getProjectPdf());
        project.setProjectZip(updatedProject.getProjectZip());
        project.setSubmissionDate(updatedProject.getSubmissionDate());
        project.setReviewStatus(updatedProject.getReviewStatus());
        project.setAdminFeedback(updatedProject.getAdminFeedback());

        return repository.save(project);
    }

    @DeleteMapping("/{id}")
    public String deleteProject(@PathVariable Long id) {

        repository.deleteById(id);

        return "Project Deleted Successfully";
    }

    @PutMapping("/approve/{id}")
    public Project approveProject(@PathVariable Long id) {

        Project project = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project Not Found"));

        project.setReviewStatus("Approved");

        return repository.save(project);
    }

    @PutMapping("/reject/{id}")
    public Project rejectProject(@PathVariable Long id) {

        Project project = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project Not Found"));

        project.setReviewStatus("Rejected");

        return repository.save(project);
    }

    @PutMapping("/feedback/{id}")
    public Project giveFeedback(
            @PathVariable Long id,
            @RequestBody Project updatedProject) {

        Project project = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project Not Found"));

        project.setAdminFeedback(updatedProject.getAdminFeedback());

        return repository.save(project);
    }
}