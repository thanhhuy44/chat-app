import Image from "next/image";
import avatar from "../assets/images/user.png";
import { useSelector } from "react-redux";
import Link from "next/link";

function ContactItem({ conversation }) {
  const currUser = useSelector((state) => state.chatApp.currUser);

  const getContact = () => {
    const user = conversation.members.filter((member) => {
      if (member._id !== currUser._id) {
        return member;
      }
    });
    return user[0];
  };

  getContact();

  return (
    <Link href={`/chat/${conversation._id}`} passHref={true}>
      <a
        href={`/chat/${conversation._id}`}
        className="rounded-xl bg-primary-3 hover:bg-primary-2 cursor-pointer flex w-full items-center px-4 py-4 gap-x-4"
      >
        <div className="relative">
          <div className="w-10 aspect-square flex items-center justify-center">
            <Image
              className="relative block w-[40px] aspect-square rounded-full"
              src={avatar}
              alt="avatar"
            />
          </div>
          <div className="w-3 h-3 absolute bottom-0 right-0 rounded-full bg-green-500"></div>
        </div>
        <div>
          <p className="font-semibold text-base leading-6 text-primary-1">
            {getContact().userName}
          </p>
          <p className="text-sm leading-5 line-clamp-1">
            {conversation.lastMessage.sender === currUser._id && "You: "}
            {conversation.lastMessage.text}
          </p>
        </div>
      </a>
    </Link>
  );
}

export default ContactItem;
