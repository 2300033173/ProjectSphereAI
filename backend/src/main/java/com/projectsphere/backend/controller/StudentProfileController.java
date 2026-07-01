package com.projectsphere.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.projectsphere.backend.entity.StudentProfile;

@RestController
@RequestMapping("/profile")
@CrossOrigin("*")
public class StudentProfileController {

    private List<StudentProfile> profiles = new ArrayList<>();

    @GetMapping
    public List<StudentProfile> getProfiles() {
        return profiles;
    }

    @PostMapping
    public StudentProfile addProfile(
            @RequestBody StudentProfile profile) {

        profiles.add(profile);
        return profile;
    }
}