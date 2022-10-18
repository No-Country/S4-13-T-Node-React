import React from 'react';
import MenuList from './MenuList';

import useOpenNavbar from '../../../../hooks/useOpenNavbar';

const HamburguerMenu = () => {
  const { handleClick, open } = useOpenNavbar();

  return (
    <div className="flex text-white w-4 mr-3">
      <svg
        width="25"
        height="4"
        viewBox="0 0 25 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleClick}
        className={`right-6 top-6 cursor-pointer lg:hidden ${open ? 'absolute' : 'hidden'}`}
      >
        <path
          d="M2 2H23M2 2H23M2 2H23"
          stroke="#F5F5F5"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        width="24"
        height="19"
        viewBox="0 0 24 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleClick}
        className={`right-6 top-4 cursor-pointer lg:hidden ${open ? 'hidden' : 'absolute'}`}
      >
        <path
          d="M1.5 17.5H22.5M1.5 9.5H22.5M1.5 1.5H22.5"
          stroke="#F5F5F5"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <MenuList open={open} />
    </div>
  );
};

export default HamburguerMenu;
