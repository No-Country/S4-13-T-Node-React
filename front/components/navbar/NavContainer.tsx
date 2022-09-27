import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import MenuItems from './menu/desktopMenu/MenuItems';
import HamburguerMenu from './menu/hamburguerMenu/HamburguerMenu';
import TagsSection from './menu/tags/TagsSection';
import { Searchbar } from './searchbar/Searchbar';

const NavContainer = () => {
  return (
    <div className="select-none px-5 bg-primary h-14 min-w-screen w-full sm:w-[512px] lg:w-[1024px]  rounded-b-lg flex flex-row relative items-center lg:justify-between">
      <div className=" items-center lg:hidden mt-2">
        <Link href="/" className="curor-pointer ">
          <Image src="/assets/logo/logoMobile.png" width="54px" height="43px" />
        </Link>
      </div>

      <div className=" items-center ml-5 hidden lg:flex">
        <Link href="/" className="curor-pointer ">
          <Image src="/assets/logo/logoDesktop.png" className="object-contain" width="140px" height="56px" />
        </Link>
      </div>

      <TagsSection />
      <Searchbar />
      <HamburguerMenu />
      <MenuItems />
    </div>
  );
};

export default NavContainer;
