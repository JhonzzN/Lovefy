package com.example.demo.controller;

import com.example.demo.model.Feedback;
import com.example.demo.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedbacks")
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @PostMapping
    public ResponseEntity<Feedback> enviarFeedback(@RequestBody Feedback feedback) {
        Feedback novoFeedback = feedbackRepository.save(feedback);
        return ResponseEntity.ok(novoFeedback);
    }

    @GetMapping
    public ResponseEntity<List<Feedback>> listarFeedbacks() {
        return ResponseEntity.ok(feedbackRepository.findAll());
    }
}