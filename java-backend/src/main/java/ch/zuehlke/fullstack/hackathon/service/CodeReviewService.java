package ch.zuehlke.fullstack.hackathon.service;


import ch.zuehlke.fullstack.hackathon.model.ReviewDto;
import ch.zuehlke.fullstack.hackathon.model.CodeSnippetDto;
import ch.zuehlke.fullstack.hackathon.model.SanitizationRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CodeReviewService {

    private final AiService aiService;

    public ReviewDto getCodeReview(String codeSnippet) {
        Optional<String> example = aiService.getCodeReview(codeSnippet);
        return new ReviewDto(example.orElse("No review."));
    }

    public ReviewDto getExampleCodeReview() {
        String exampleCodeReview = "The code is perfect. No review necessary!";
        return new ReviewDto(exampleCodeReview);
    }

    public CodeSnippetDto getSanitizedCode(SanitizationRequestDto codeSnippet) {
        String sanitizedCode = codeSnippet.codeSnippet();
        return new CodeSnippetDto(sanitizedCode);
    }

    public CodeSnippetDto getUnsanitizedCode() {
        String unsanitizedCode = "codeSnippet";
        return new CodeSnippetDto(unsanitizedCode);
    }
}
