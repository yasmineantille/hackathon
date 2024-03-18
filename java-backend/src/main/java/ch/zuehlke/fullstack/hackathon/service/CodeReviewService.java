package ch.zuehlke.fullstack.hackathon.service;


import ch.zuehlke.fullstack.hackathon.model.ReviewDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CodeReviewService {

    private final AiService aiService;

    public ReviewDto getCodeReview() {
        Optional<String> example = aiService.getCodeReview();
        return new ReviewDto(example.orElse("No review."));
    }

    public ReviewDto getExampleCodeReview() {
        String exampleCodeReview = "The code is perfect. No review necessary!";
        return new ReviewDto(exampleCodeReview);
    }
}
