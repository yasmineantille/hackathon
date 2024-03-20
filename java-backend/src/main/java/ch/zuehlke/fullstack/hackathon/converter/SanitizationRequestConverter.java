package ch.zuehlke.fullstack.hackathon.converter;

import ch.zuehlke.fullstack.hackathon.dto.CodeRequestDto;
import ch.zuehlke.fullstack.hackathon.model.CodeRequest;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.NoArgsConstructor;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@NoArgsConstructor
public class SanitizationRequestConverter {

    public static CodeRequest converter(CodeRequestDto codeRequestDto) {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> resultMap = new HashMap<>();

        try {
            resultMap = objectMapper.readValue(codeRequestDto.ruleSet(), new TypeReference<>() {
            });

        } catch (IOException ignored) {
        }

        return new CodeRequest(codeRequestDto.codeSnippet(), resultMap);
    }
}
