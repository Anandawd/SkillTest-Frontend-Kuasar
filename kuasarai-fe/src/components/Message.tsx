type MessageProps = {
  role: "assistant" | "user";
  message: string;
  error?: boolean;
};

const Message = (props: MessageProps) => {
  const formattedMessage =
    props.role === "assistant"
      ? props.message
          .replace(/(\d+)\.\s+/g, "$1.")
          .split(/\n\n|(?=\d+\.\s)/)
          .map((paragraph, index) => {
            const listItems = paragraph
              .split(/\n/)
              .filter((item) => item.trim() !== "");

            return (
              <div key={index} className="mb-2">
                {listItems.map((item, itemIndex) => (
                  <p key={itemIndex} className="mb-1">
                    {item.trim()}
                  </p>
                ))}
              </div>
            );
          })
      : props.message;

  return (
    <div
      className={`flex items-center p-1 sm:p-2 my-1 ${
        props.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {props.role === "assistant" && (
        <img
          src="/avatar.png"
          alt="Avatar"
          className="w-8 h-8 object-cover rounded-full mr-2"
        />
      )}
      <div
        className={`p-3 rounded-lg ${
          props.role === "user"
            ? "text-xs sm:text-base bg-blue-400 text-white text-end"
            : "text-xs sm:text-base bg-gray-200 text-gray-900 text-start"
        } ${
          props.error
            ? "text-red-500 italic bg-white outline-1 outline-red-500"
            : ""
        }`}
      >
        {formattedMessage}
      </div>
    </div>
  );
};
// className="text-red-500 italic"
export default Message;
