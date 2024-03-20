package ch.zuehlke.fullstack.hackathon.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/upload")
@RequiredArgsConstructor
public class UploadFileController {

    @PostMapping()
    public ResponseEntity<String> handleFileUpload(@RequestBody() String fileContents) {
        return ResponseEntity.ok("File uploaded successfully");
    }
}
