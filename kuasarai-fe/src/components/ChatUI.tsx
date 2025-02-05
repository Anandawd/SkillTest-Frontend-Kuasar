import { useChat } from "@/hooks/useChat";
import { SUGGESTED_QUESTIONS } from "@/utils/chatUtils";
import { GET_ALL_COUNTRIES } from "@/utils/queries";
import { useQuery } from "@apollo/client";
import { AiOutlineSend } from "react-icons/ai";
import ChatSuggestion from "./ChatSuggestion";
import Message from "./Message";

const ChatUI = () => {
  const { data: countriesData } = useQuery(GET_ALL_COUNTRIES);
  const {
    messages,
    input,
    setInput,
    isLoading,
    error,
    messagesEndRef,
    sendMessage,
  } = useChat(countriesData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage(input);
  };

  return (
    <div className="overflow-x-auto w-full min-h-160 max-h-160 rounded-2xl p-4 lg:max-w-150 flex flex-col justify-between outline-1 outline-gray-300 drop-shadow-xl sm:drop-shadow-2xl bg-white">
      <div className="overflow-y-scroll min-h-135 sm:h-full flex flex-col justify-between">
        <div>
          {messages.map((message, index) => (
            <Message
              key={index}
              role={message.role}
              message={message.content}
            />
          ))}
          {isLoading && (
            <Message role="assistant" message="Atlas is typing..." />
          )}
          {error && (
            <Message
              role="assistant"
              message="The AI encountered an issue. Please try regenerating your response. If the problem persists, please contact us at support@atlasai.com"
              error={true}
            />
          )}
          <div ref={messagesEndRef} />
        </div>
        <div>
          {messages.length === 1 && (
            <ChatSuggestion
              questions={SUGGESTED_QUESTIONS}
              onSelect={setInput}
            />
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center mt-5">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Ask about any country in the table..."
          className="w-full sm:flex-1 p-2 outline-1 outline-gray-300 rounded mr-2"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center cursor-pointer disabled:opacity-50"
        >
          <AiOutlineSend className="mr-2" /> Send
        </button>
      </form>
    </div>
  );
};

export default ChatUI;
