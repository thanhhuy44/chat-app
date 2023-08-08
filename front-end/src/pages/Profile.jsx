import {
  User,
  PencilSimpleLine,
  EnvelopeSimple,
  Phone,
  Key,
} from "@phosphor-icons/react";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state.chat.authInfo);
  console.log("🚀 ~ file: Profile.jsx:6 ~ Profile ~ user:", user);
  return (
    <div className="p-4 grid grid-cols-3 gap-4">
      <div className="shadow-custom p-4 rounded-lg bg-primary-4 flex flex-col items-center gap-y-1">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
          alt="logo "
          className="rounded-full"
        />
        <p className="text-lg">{`${user.firstName} ${user.lastName}`}</p>
        <p className="text-sm font-light">{`@${user.userName}`}</p>
      </div>
      <div className="col-span-2 p-4 bg-primary-4 rounded-lg shadow-custom">
        <div className="py-2 px-4 grid grid-cols-12 items-center border-b border-primary-3 last:border-none">
          <p className="col-span-4 flex items-center gap-x-1 text-base">
            <User size={16} /> Full Name:
          </p>
          <p className="col-span-7">{`${user.firstName} ${user.lastName}`}</p>
          <PencilSimpleLine
            size={16}
            className="mx-auto cursor-pointer hover:text-primary-2 duration-150"
          />
        </div>
        <div className="py-2 px-4 grid grid-cols-12 items-center border-b border-primary-3 last:border-none">
          <p className="col-span-4 flex items-center gap-x-1 text-base">
            <EnvelopeSimple size={16} /> Email:
          </p>
          <p className="col-span-7">{`${user.email}`}</p>
          <PencilSimpleLine
            size={16}
            className="mx-auto cursor-pointer hover:text-primary-2 duration-150"
          />
        </div>
        <div className="py-2 px-4 grid grid-cols-12 items-center border-b border-primary-3 last:border-none">
          <p className="col-span-4 flex items-center gap-x-1 text-base">
            <Phone size={16} /> Phone:
          </p>
          <p className="col-span-7">{`${user.phoneNumber}`}</p>
          <PencilSimpleLine
            size={16}
            className="mx-auto cursor-pointer hover:text-primary-2 duration-150"
          />
        </div>
        <div className="py-2 px-4 grid grid-cols-12 items-center border-b border-primary-3 last:border-none">
          <p className="col-span-4 flex items-center gap-x-1 text-base">
            <Key size={16} /> Password:
          </p>
          <p className="col-span-7">*************</p>
          <PencilSimpleLine
            size={16}
            className="mx-auto cursor-pointer hover:text-primary-2 duration-150"
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
