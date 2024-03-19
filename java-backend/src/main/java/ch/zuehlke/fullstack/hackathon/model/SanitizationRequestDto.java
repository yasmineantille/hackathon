package ch.zuehlke.fullstack.hackathon.model;

import java.util.Map;

public record SanitizationRequestDto(String codeSnippet, Map<String, String> ruleset) {}
