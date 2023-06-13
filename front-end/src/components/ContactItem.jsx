import { UserCircle } from "@phosphor-icons/react";

function ContactItem() {
  return (
    <div className="flex items-center justify-between bg-primary-3 px-4 py-2">
      <div className="flex-1 flex items-center gap-x-2">
        <div className="relative w-[52px] aspect-square">
          <UserCircle size={52} />
          <div className="absolute w-2 h-2 bg-green-400 rounded-full bottom-1 right-1"></div>
        </div>
        <div>
          <p className="text-xl font-medium text-primary-1">Thanhhuy44</p>
          <p className="text-base text-black font-light leading-4">
            How are you?
          </p>
        </div>
      </div>
      <div>
        <p>12:30</p>
      </div>
    </div>
  );
}

export default ContactItem;
