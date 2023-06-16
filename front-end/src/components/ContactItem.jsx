import { UserCircle } from "@phosphor-icons/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ContactItem({ data }) {
  const user = useSelector((state) => state.chat.authInfo);

  const guestUser = data?.members.filter((member) => {
    return member._id !== user._id && member;
  });

  return (
    <Link
      to={`/conversations/${data._id}`}
      state={{
        id: data._id,
      }}
      className="flex items-center justify-between bg-primary-3 p-2 cursor-pointer hover:bg-primary-2 duration-200 rounded-lg overflow-hidden"
    >
      <div className="flex-1 flex items-center gap-x-2">
        <div className="relative w-[52px] aspect-square">
          <UserCircle size={52} />
          <div className="absolute w-2 h-2 bg-green-400 rounded-full bottom-1 right-1"></div>
        </div>
        <div>
          <p className="text-xl font-medium text-primary-1 line-clamp-1">
            {guestUser[0].userName}
          </p>
          <p className="text-base text-black font-light leading-4 line-clamp-1">
            {data?.lastMessage?.text}
          </p>
        </div>
      </div>
      <div>
        <p>12:30</p>
      </div>
    </Link>
  );
}

export default ContactItem;
