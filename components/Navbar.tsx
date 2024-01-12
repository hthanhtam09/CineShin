import { useCallback, useState } from 'react';
import { BsSearch, BsFacebook } from 'react-icons/bs';
import { TfiEmail } from 'react-icons/tfi';
import Link from 'next/link';

import Search from './Search';
import NavbarItem from './NavbarItem';
import { convertToTitleCase } from '@/utils/utils';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const navbarItemListData = ['Home', 'up_comming'];

  const [isShowSearch, setIsShowSearch] = useState<boolean>(false);

  const isOpenSearch = useCallback(() => {
    setIsShowSearch((prev) => !prev);
  }, []);

  const isOpenFacebook = useCallback(() => {
    window.location.href = 'https://www.facebook.com/hth9199';
  }, []);

  const isOpenEmail = useCallback(() => {
    window.location.href = 'mailto:hthanhtam0901@gmail.com';
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div className="px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 bg-zinc-800 bg-opacity-90">
        <Link href={'/'}>
          <img className="bg-cover" src="/images/logo.png" alt="Logo" width={100} height={100} />
        </Link>
        <div className="flex flex-row ml-auto gap-7 items-center justify-between w-[50%]">
          {/* <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <Language />
          </div> */}
          <div className="flex-row ml-8 gap-12 hidden lg:flex">
            {navbarItemListData.map((item) => (
              <NavbarItem label={convertToTitleCase(item)} key={item} />
            ))}
          </div>
          <div className="flex items-center ml-8 gap-8 lg:flex">
            <div
              className="text-gray-200 hover:text-gray-300 cursor-pointer transition"
              onClick={isOpenFacebook}
            >
              <BsFacebook />
            </div>
            <div
              className="text-gray-200 hover:text-gray-300 cursor-pointer transition"
              onClick={isOpenEmail}
            >
              <TfiEmail />
            </div>
            <div
              className="text-gray-200 hover:text-gray-300 cursor-pointer transition"
              onClick={isOpenSearch}
            >
              <BsSearch />
            </div>
            <Image
              src={'/images/gif/cat1.gif'}
              alt="GIF"
              width={100}
              height={100}
              style={{ width: '100', height: '100' }}
              priority={true}
            />
          </div>
        </div>
      </div>
      {isShowSearch && <Search isOpenSearch={isOpenSearch} />}
    </nav>
  );
};

export default Navbar;
