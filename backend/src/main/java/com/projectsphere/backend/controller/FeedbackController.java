package com.projectsphere.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.projectsphere.backend.entity.Feedback;

@RestController
@RequestMapping("/feedback")
@CrossOrigin("*")
public class FeedbackController {

    private List<Feedback> feedbacks =
            new ArrayList<>();

    @GetMapping
    public List<Feedback> getFeedbacks() {
        return feedbacks;
    }

    @PostMapping
    public Feedback addFeedback(
            @RequestBody Feedback feedback) {

        feedbacks.add(feedback);

        return feedback;
    }
}