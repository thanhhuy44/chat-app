function Message({ isSender, text }) {
  return (
    <div
      className={`flex items-center w-full ${
        isSender ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`p-2 max-w-[80%] text-justify break-words ${
          isSender ? "bg-primary-4" : "bg-primary-3"
        } rounded-lg shadow-custom`}
      >
        {text}
      </div>
    </div>
  );
}

export default Message;
