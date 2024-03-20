package ch.zuehlke.fullstack.hackathon.controller;

import ch.zuehlke.fullstack.hackathon.converter.SanitizationRequestConverter;
import ch.zuehlke.fullstack.hackathon.dto.CodeSnippetDto;
import ch.zuehlke.fullstack.hackathon.dto.CodeRequestDto;
import ch.zuehlke.fullstack.hackathon.model.CodeRequest;
import ch.zuehlke.fullstack.hackathon.service.CodeReviewService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<CodeSnippetDto> postSanitizeCode(@RequestBody CodeRequestDto request) {
        CodeSnippetDto result;
        try {
            CodeRequest req = SanitizationRequestConverter.converter(request);
            result = this.codeReviewService.getSanitizedCode(req);
        } catch (Exception exception) {
            log.error("Sanitized code could not be fetched", exception);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
