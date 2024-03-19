package ch.zuehlke.fullstack.hackathon.controller;

import ch.zuehlke.fullstack.hackathon.model.CodeSnippetDto;
import ch.zuehlke.fullstack.hackathon.model.SanitizationRequestDto;
import ch.zuehlke.fullstack.hackathon.service.CodeReviewService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/sanitize")
@RequiredArgsConstructor
@Slf4j
public class SanitizationController {

    private final CodeReviewService codeReviewService;

    @ApiResponse(responseCode = "200", description = "Successfully returned sanitized code")
    @ApiResponse(responseCode = "500", description = "Something failed internally")
    @PostMapping()
    public ResponseEntity<CodeSnippetDto> postSanitizeCode(RequestEntity<SanitizationRequestDto> request) {
        CodeSnippetDto result;
        try {
            result = this.codeReviewService.getSanitizedCode(request.getBody());
        } catch (Exception exception) {
            log.error("Sanitized code could not be fetched", exception);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @ApiResponse(responseCode = "200", description = "Successfully returned unsanitized code")
    @ApiResponse(responseCode = "500", description = "Something failed internally")
    @GetMapping()
    public ResponseEntity<CodeSnippetDto> getUnsanitizedCode() {
        CodeSnippetDto result;
        try {
            result = this.codeReviewService.getUnsanitizedCode();
        } catch (Exception exception) {
            log.error("Sanitized code could not be fetched", exception);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
