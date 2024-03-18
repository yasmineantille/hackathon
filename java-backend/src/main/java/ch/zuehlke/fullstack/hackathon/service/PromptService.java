package ch.zuehlke.fullstack.hackathon.service;

public class PromptService {

    private final String INTRODUCTION = "Please provide a code review of the following code for any logical or security concerns as well as best practices and clean code. ";

    private final String SPECIFIC_INSTRUCTIONS = "Additionally, if there are any potential edge cases or bugs, I'd like those to be pointed out as well. ";

    private final String EXPECTATIONS = "Please provide the review directly in the code as comments in the coding language (if necessary multiline), indicating areas for improvement, " +
                                        "suggestions for optimizations, and any concerns regarding readability or potential bugs. ";
    private final String CLOSING = "Thank you in advance for your assistance!";


    public String generateCodeReviewPrompt(String codeSnippet) {
        StringBuilder promptBuilder = new StringBuilder();

        promptBuilder.append(INTRODUCTION);
        promptBuilder.append(SPECIFIC_INSTRUCTIONS);
        promptBuilder.append("\n\n");

        promptBuilder.append("**Code Snippet:**\n");
        promptBuilder.append("```\n");
        promptBuilder.append(codeSnippet);
        promptBuilder.append("\n```");
        promptBuilder.append("\n\n");

        promptBuilder.append(EXPECTATIONS);
        promptBuilder.append("\n\n");

        promptBuilder.append(CLOSING);
        promptBuilder.append("\n\n");

        return promptBuilder.toString();
    }
}
