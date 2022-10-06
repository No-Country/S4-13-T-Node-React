import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';
import MenuList from './MenuList';

import useOpenNavbar from '../../../../hooks/useOpenNavbar';

const HamburguerMenu = () => {
  const { handleClick, open } = useOpenNavbar();

  return (
    <div className=" text-white w-4 mr-3 ">
      <IoClose
        onClick={handleClick}
        className={`text-2xl right-6 top-4 cursor-pointer lg:hidden ${open ? 'absolute' : 'hidden'}`}
      />
      <GiHamburgerMenu
        onClick={handleClick}
        className={`text-2xl right-6 top-4 cursor-pointer lg:hidden ${open ? 'hidden' : 'absolute'}`}
      />
      <MenuList open={open} />
    </div>
  );
};

export default HamburguerMenu;
