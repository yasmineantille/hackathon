package ch.zuehlke.fullstack.hackathon.service;


import ch.zuehlke.fullstack.hackathon.dto.ReviewDto;
import ch.zuehlke.fullstack.hackathon.dto.CodeSnippetDto;
import ch.zuehlke.fullstack.hackathon.model.CodeRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;

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
            String escapedKey = Pattern.quote(entry.getKey());
            codeSnippet = codeSnippet.replaceAll(escapedKey, entry.getValue());
        }

        return new CodeSnippetDto(codeSnippet);
    }

    public String getUnsanitizedCode(String codeSnippet, Map<String, String> ruleset) {
        String result = codeSnippet;
        for(Map.Entry<String, String> entry: ruleset.entrySet()) {
            String escapedValue = Pattern.quote(entry.getValue());
            result = result.replaceAll(escapedValue, entry.getKey());
        }

        return result;
    }
}
