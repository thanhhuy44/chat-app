import { UserCircle } from '@phosphor-icons/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

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
      className="flex items-center gap-x-2 justify-between bg-primary-3 p-2 cursor-pointer hover:bg-primary-2 duration-200 rounded-lg overflow-hidden shadow-custom">
      <div className="flex-1 flex items-center gap-x-2">
        <div className="relative w-[52px] aspect-square">
          <UserCircle size={52} />
          {guestUser[0]?.isOnline && (
            <div className="absolute w-2 h-2 bg-green-400 rounded-full bottom-1 right-1"></div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-x-2 w-full justify-between">
            <p className="text-xl font-medium text-primary-1 line-clamp-1 break-all">
              {guestUser[0].userName}
            </p>
            <p>{moment(data?.lastMessage?.createdAt).format('hh:mm')}</p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`flex-1 text-base text-black leading-2 line-clamp-1 ${
                data?.lastMessage?.seenBy.includes(user._id)
                  ? 'font-light'
                  : 'font-semibold'
              }`}>
              {data?.lastMessage?.sender === user._id && 'You: '}
              {data?.lastMessage?.text}
            </p>
            {!data?.lastMessage?.seenBy.includes(user._id) && (
              <p className="w-3 h-3 text-base rounded-full bg-primary-1"></p>
            )}
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col justify-between h-full">
        <p>{moment(data?.lastMessage?.createdAt).format("hh:mm")}</p>
        
      </div> */}
    </Link>
  );
}

export default ContactItem;
