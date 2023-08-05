import { PaperPlaneRight } from '@phosphor-icons/react';

function ChatFooter({ onSubmit, message, setMessage }) {
  return (
    <div className="p-4">
      <div className="py-2 flex w-full items-center gap-x-2 bg-primary-3 px-4 rounded-lg focus-within:bg-primary-2 focus-within:shadow-custom duration-200">
        <input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="Type message..."
          className="block flex-1 py-2 focus:outline-none bg-transparent"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && message.trim() !== '') {
              onSubmit();
            }
          }}
        />
        <div
          onClick={onSubmit}
          className="cursor-pointer text-primary-5 hover:text-primary-4 duration-150">
          <PaperPlaneRight weight="fill" size={32} />
        </div>
      </div>
    </div>
  );
}

export default ChatFooter;
