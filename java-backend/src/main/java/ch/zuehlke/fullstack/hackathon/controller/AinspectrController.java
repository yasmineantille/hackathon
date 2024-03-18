package ch.zuehlke.fullstack.hackathon.controller;

import ch.zuehlke.fullstack.hackathon.model.ReviewDto;
import ch.zuehlke.fullstack.hackathon.service.CodeReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/review")
@RequiredArgsConstructor
@Slf4j
public class AinspectrController {

    private final CodeReviewService codeReviewService;

    @ApiResponse(responseCode = "200", description = "Successfully returned code review")
    @ApiResponse(responseCode = "500", description = "Something failed internally")
    @PostMapping("/")
    public ResponseEntity<ReviewDto> getCodeReview(@RequestParam String codeSnippet) {
        ReviewDto result;
        try {
            result = this.codeReviewService.getCodeReview(codeSnippet);
        } catch (Exception exception) {
            log.error("Code review could not be fetched", exception);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Operation(summary = "Example demo DTO",
            description = "This can be used to enrich swagger documentation")
    @ApiResponse(responseCode = "200", description = "Successfully returned code review")
    @ApiResponse(responseCode = "500", description = "Something failed internally")
    @GetMapping("/example")
    public ResponseEntity<ReviewDto> getExampleCodeReview() {
        ReviewDto result;
        try {
            result = this.codeReviewService.getExampleCodeReview();
        } catch (Exception exception) {
            log.error("Example code review could not be fetched", exception);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
