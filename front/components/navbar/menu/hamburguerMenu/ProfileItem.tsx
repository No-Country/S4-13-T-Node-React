import Link from 'next/link';
import React from 'react';
import { MenuItem } from '../../../../interfaces';

export const ProfileItem = (props: MenuItem) => {
  return (
    <>
      <Link href="/profile">
        <a className="flex flex-row gap-2 text-white items-center justify-center text-[20px] pt-3">
          <h2 className="capitalize font-orelega">{props.text}</h2>
          {props.icon}
        </a>
      </Link>
    </>
  );
};
