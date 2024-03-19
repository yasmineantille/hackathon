package ch.zuehlke.fullstack.hackathon.service;


import ch.zuehlke.fullstack.hackathon.dto.ReviewDto;
import ch.zuehlke.fullstack.hackathon.dto.CodeSnippetDto;
import ch.zuehlke.fullstack.hackathon.model.CodeRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
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

    public CodeSnippetDto getSanitizedCode(CodeRequest codeRequest) {
        String codeSnippet = codeRequest.codeSnippet();
        Map<String, String> ruleset = codeRequest.ruleset();

        for(Map.Entry<String, String> entry: ruleset.entrySet()) {
            codeSnippet = codeSnippet.replaceAll(entry.getKey(), entry.getValue());
        }

        return new CodeSnippetDto(codeSnippet);
    }

    public ReviewDto getUnsanitizedCode(String codeSnippet, Map<String, String> ruleset) {
        String result = codeSnippet;
        for(Map.Entry<String, String> entry: ruleset.entrySet()) {
            result = codeSnippet.replaceAll(entry.getValue(), entry.getKey());
        }

        return new ReviewDto(result);
    }
}
