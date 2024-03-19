package ch.zuehlke.fullstack.hackathon.model;

import java.util.Map;

public record CodeRequest(String codeSnippet, Map<String, String> ruleset){ }
