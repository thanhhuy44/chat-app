function Message({ isSender, text }) {
  return isSender ? (
    <div className="flex w-full justify-end">
      <p className="rounded-xl max-w-[70%] py-2 px-4 text-primary-1 bg-white">
        {text}
      </p>
    </div>
  ) : (
    <div className="flex w-full justify-start">
      <p className="rounded-xl max-w-[70%] py-2 px-4 text-primary-1 bg-primary-3">
        {text}
      </p>
    </div>
  );
}

export default Message;
