import { createContextFromCountries } from "@/utils/chatUtils";
import { ChatConfig, Message } from "@/utils/types";
import { useRef, useState } from "react";

export const useChat = (countriesData: any) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello there! How can i assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const chatConfig: ChatConfig = {
    model: "meta/llama-3.1-405b-instruct",
    temperature: 0.2,
    top_p: 0.7,
    max_tokens: 1024,
  };

  const sendMessage = async (userInput: string) => {
    if (!userInput.trim()) return;

    setError(null);
    const userMessage: Message = { role: "user", content: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const contextMessage = createContextFromCountries(
        countriesData?.countries
      );
      const promptWithContext = `${contextMessage}\n\nUser question: ${userInput}`;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: promptWithContext }],
          ...chatConfig,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await processStreamResponse(response);
    } catch (error) {
      console.error("Error in chat:", error);
      setError("Failed to connect to AI service");
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  const processStreamResponse = async (response: Response) => {
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let assistantResponse = "";

    while (true) {
      const { done, value } = (await reader?.read()) || {};
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.startsWith("data:")) {
          try {
            const jsonLine = line.replace("data:", "").trim();
            if (jsonLine && jsonLine !== "[DONE]") {
              const parsedData = JSON.parse(jsonLine);
              const content = parsedData.message;

              if (content) {
                const formattedContent = content.replace(
                  /(\d+\.\s[^\n]+)(?=\s*\d+\.)/g,
                  "$1\n"
                );
                assistantResponse += formattedContent;
                updateMessages(assistantResponse);
              }
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        }
      }
    }
  };

  const updateMessages = (assistantResponse: string) => {
    setMessages((prev) => {
      const lastMessage = prev[prev.length - 1];
      if (lastMessage.role === "assistant") {
        return [
          ...prev.slice(0, -1),
          { ...lastMessage, content: assistantResponse },
        ];
      }
      return [...prev, { role: "assistant", content: assistantResponse }];
    });
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    error,
    messagesEndRef,
    sendMessage,
  };
};
