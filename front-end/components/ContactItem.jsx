import Image from "next/image";
import avatar from "../assets/images/user.png";

function ContactItem({ user }) {
  return (
    <div className="rounded-xl bg-primary-3 hover:bg-primary-2 cursor-pointer flex w-full items-center px-4 py-4 gap-x-4">
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
          {user.userName}
        </p>
        <p className="text-sm leading-5 line-clamp-1">
          Last message fahf fawfh kfakwef ;e efhal ehfa
        </p>
      </div>
    </div>
  );
}

export default ContactItem;
