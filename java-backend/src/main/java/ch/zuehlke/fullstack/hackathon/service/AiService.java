package ch.zuehlke.fullstack.hackathon.service;

import com.theokanning.openai.completion.chat.ChatCompletionChoice;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.completion.chat.ChatMessageRole;
import com.theokanning.openai.image.CreateImageRequest;
import com.theokanning.openai.image.Image;
import com.theokanning.openai.service.OpenAiService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;
import java.util.Optional;

@Service
public class AiService {

    @Value("${app.openapi.key}")
    protected String apiKey;

    private OpenAiService openAiService;

    private final PromptService promptService;

    private final String MODEL = "gpt-4-0125-preview";

    public AiService() {
        promptService = new PromptService();
    }

    public Optional<String> getMessageOfTheDay() {
        ChatMessage message = new ChatMessage(ChatMessageRole.USER.value(), "Write a message of the day for a software engineer.");
        List<ChatMessage> messages = List.of(message);
        ChatCompletionRequest chatRequest = ChatCompletionRequest.builder()
                .messages(messages)
                .model(this.MODEL)
                .maxTokens(100)
                .n(1)
                .build();

        return getOpenAiService().createChatCompletion(chatRequest).getChoices().stream()
                .findFirst()
                .map(ChatCompletionChoice::getMessage)
                .map(ChatMessage::getContent);
    }

    public Optional<String> getCatImageUrl() {
        CreateImageRequest request = CreateImageRequest.builder()
                .prompt("Draw an image of a cat engineering software.")
                .size("512x512")
                .responseFormat("url")
                .n(1)
                .build();

        return getOpenAiService().createImage(request).getData().stream()
                .findFirst()
                .map(Image::getUrl);
    }

    public Optional<String> getCodeReview(String codeSnippet) {
        String prompt = promptService.generateCodeReviewPrompt(codeSnippet);
        ChatMessage message = new ChatMessage(ChatMessageRole.USER.value(), prompt);
        List<ChatMessage> messages = List.of(message);
        ChatCompletionRequest chatRequest = ChatCompletionRequest.builder()
                .messages(messages)
                .model(this.MODEL)
                .n(1)
                .build();

        return getOpenAiService().createChatCompletion(chatRequest).getChoices().stream()
                .findFirst()
                .map(ChatCompletionChoice::getMessage)
                .map(ChatMessage::getContent);
    }


    private OpenAiService getOpenAiService() {
        if (openAiService == null) {
            this.openAiService = new OpenAiService(apiKey, Duration.ofSeconds(30));
        }

        return openAiService;
    }
}
