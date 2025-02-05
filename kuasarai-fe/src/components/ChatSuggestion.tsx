import React from "react";

interface ChatSuggestionProps {
  questions: string[];
  onSelect: (question: string) => void;
}

const ChatSuggestion: React.FC<ChatSuggestionProps> = ({
  questions,
  onSelect,
}) => {
  return (
    <div className="justify-between">
      <p className="text-sm text-gray-500 mb-3">Suggested questions</p>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onSelect(question)}
            className="text-left text-xs sm:text-base bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 text-gray-700 my-1 shadow-sms sm:shadow-lg cursor-pointer"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatSuggestion;
