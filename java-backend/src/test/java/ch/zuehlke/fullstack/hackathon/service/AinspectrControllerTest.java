package ch.zuehlke.fullstack.hackathon.service;

import ch.zuehlke.fullstack.hackathon.dto.ReviewDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class AinspectrControllerTest {

    private CodeReviewService codeReviewService;

    private AiService aiService;

    @BeforeEach
    void setUp() {
        aiService = new AiService();
        aiService.apiKey = "";
        codeReviewService = new CodeReviewService(aiService);
    }

    @Test
    void getExampleCodeReview_successfully() {
        ReviewDto reviewDto = codeReviewService.getExampleCodeReview();

        assertThat(reviewDto).isNotNull();
        assertThat(reviewDto.review()).isEqualTo("The code is perfect. No review necessary!");
    }

    @Test
    void getCodeReview() {
        String codeSnippet = "public class Fibonacci {\n" +
                "    public static int fibonacci(int n) {\n" +
                "        if (n <= 1) {\n" +
                "            return n;\n" +
                "        } else {\n" +
                "            return fibonacci(n - 1) + fibonacci(n - 2);\n" +
                "        }\n" +
                "    }\n" +
                "}";

        ReviewDto reviewDto = codeReviewService.getCodeReview(codeSnippet);

        System.out.println("Result: " + reviewDto.review());

        assertThat(reviewDto).isNotNull();
        assertThat(reviewDto.review()).contains("public class Fibonacci");
    }
}
