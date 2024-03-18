package ch.zuehlke.fullstack.hackathon.service;

import ch.zuehlke.fullstack.hackathon.model.ReviewDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;

class AinspectrControllerTest {

    private CodeReviewService codeReviewService;

    private AiService aiServiceMock;

    @BeforeEach
    void setUp() {
        aiServiceMock = mock(AiService.class);
        codeReviewService = new CodeReviewService(aiServiceMock);
    }

    @Test
    void getExampleCodeReview_successfully() {
        ReviewDto reviewDto = codeReviewService.getExampleCodeReview();

        assertThat(reviewDto).isNotNull();
        assertThat(reviewDto.review()).isEqualTo("The code is perfect. No review necessary!");
    }
}
