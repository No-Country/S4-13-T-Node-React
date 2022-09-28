import Link from 'next/link';
import React from 'react';
import { BiUserCircle } from 'react-icons/bi';

export const ProfileItem = () => {
  return (
    <div>
      <Link href="#">
        <a>
          <BiUserCircle className="text-[30px] cursor-pointer text-white" />
        </a>
      </Link>
    </div>
  );
};
