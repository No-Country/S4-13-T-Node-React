import Link from 'next/link';
import React from 'react';
import { BiUserCircle } from 'react-icons/bi';

export const ProfileItem = () => {
  return (
    <div>
      <Link href="#">
        <BiUserCircle className="text-[30px] cursor-pointer text-white" />
      </Link>
    </div>
  );
};
