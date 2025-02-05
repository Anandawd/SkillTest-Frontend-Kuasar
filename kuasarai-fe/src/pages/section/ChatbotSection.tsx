import ChatUI from "../../components/ChatUI";

const ChatbotSection = () => {
  return (
    <div
      id="chatbot"
      className="w-full flex flex-col lg:flex-row gap-10 lg:gap-5 justify-between my-30 sm:my-50 "
    >
      <div className="absolute w-[300px] sm:w-[400px] lg:w-[600px] h-auto left-0 mt-380 xs:mt-350 sm:mt-340 lg:mt-90 CharBlur -z-10 ">
        <img src="/bot.png" alt="bot" />
      </div>
      <div className="w-full lg:max-w-120 text-start">
        <h1 className="text-gray-900 text-3xl sm:text-5xl font-bold mb-3">
          Ask Our AI
        </h1>
        <h2 className="text-gray-500 text-base sm:text-xl mb-5">
          Your Personal Travel Assistant
        </h2>
        <p className="text-gray-800 text-base sm:text-xl/normal">
          Ask about countries you're interested in, get travel recommendations,
          or easily translate country information. Our AI assistant is ready to
          help you with fast and accurate answers. Start a conversation now and
          explore the world like never before.
        </p>
      </div>
      <ChatUI />
    </div>
  );
};

export default ChatbotSection;
