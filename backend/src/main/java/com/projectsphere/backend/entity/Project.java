package com.projectsphere.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Student Details
    private Long studentId;
    private String studentName;

    // Project Details
    private String title;
    private String description;
    private String technology;
    private String category;

    // Progress
    private String status;
    private int progress;

    // Links
    private String githubLink;
    private String demoLink;

    // Uploaded Files
    private String projectImage;
    private String projectPdf;
    private String projectZip;

    // Submission
    private String submissionDate;

    // Admin Review
    private String reviewStatus = "Pending";
    private String adminFeedback;
    private int projectRating;

    public Project() {
    }

    public Project(Long id,
                   Long studentId,
                   String studentName,
                   String title,
                   String description,
                   String technology,
                   String category,
                   String status,
                   int progress,
                   String githubLink,
                   String demoLink,
                   String projectImage,
                   String projectPdf,
                   String projectZip,
                   String submissionDate,
                   String reviewStatus,
                   String adminFeedback,
                   int projectRating) {

        this.id = id;
        this.studentId = studentId;
        this.studentName = studentName;
        this.title = title;
        this.description = description;
        this.technology = technology;
        this.category = category;
        this.status = status;
        this.progress = progress;
        this.githubLink = githubLink;
        this.demoLink = demoLink;
        this.projectImage = projectImage;
        this.projectPdf = projectPdf;
        this.projectZip = projectZip;
        this.submissionDate = submissionDate;
        this.reviewStatus = reviewStatus;
        this.adminFeedback = adminFeedback;
        this.projectRating = projectRating;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTechnology() {
        return technology;
    }

    public void setTechnology(String technology) {
        this.technology = technology;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getProgress() {
        return progress;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }

    public String getGithubLink() {
        return githubLink;
    }

    public void setGithubLink(String githubLink) {
        this.githubLink = githubLink;
    }

    public String getDemoLink() {
        return demoLink;
    }

    public void setDemoLink(String demoLink) {
        this.demoLink = demoLink;
    }

    public String getProjectImage() {
        return projectImage;
    }

    public void setProjectImage(String projectImage) {
        this.projectImage = projectImage;
    }

    public String getProjectPdf() {
        return projectPdf;
    }

    public void setProjectPdf(String projectPdf) {
        this.projectPdf = projectPdf;
    }

    public String getProjectZip() {
        return projectZip;
    }

    public void setProjectZip(String projectZip) {
        this.projectZip = projectZip;
    }

    public String getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(String submissionDate) {
        this.submissionDate = submissionDate;
    }

    public String getReviewStatus() {
        return reviewStatus;
    }

    public void setReviewStatus(String reviewStatus) {
        this.reviewStatus = reviewStatus;
    }

    public String getAdminFeedback() {
        return adminFeedback;
    }

    public void setAdminFeedback(String adminFeedback) {
        this.adminFeedback = adminFeedback;
    }

    public int getProjectRating() {
        return projectRating;
    }

    public void setProjectRating(int projectRating) {
        this.projectRating = projectRating;
    }
}