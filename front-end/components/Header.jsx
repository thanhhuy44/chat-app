import Image from 'next/image';
import logo from '../assets/images/logo.png';
import Link from 'next/link';
import request from '../utils/axios';

function Header() {
  const handleLogout = async () => {
    await request.post('/user/logout').then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="px-8 py-2 bg-primary-5 h-20 flex items-center justify-between">
      <div className="flex items-center h-full gap-4">
        <Image
          className="block h-full w-auto bg-primary-5"
          src={logo}
          alt="logo"
        />
        <h1 className="font-black text-[48px] leading-[56px] text-primary-1">
          Chat App
        </h1>
      </div>
      <div className="flex items-center gap-x-4 text-primary-1 font-normal text-[20px]">
        <Link href={'#'}>Home</Link>
        <div onClick={handleLogout}>About US</div>
        <Link href={'#'}>Sign Out</Link>
      </div>
    </div>
  );
}

export default Header;
