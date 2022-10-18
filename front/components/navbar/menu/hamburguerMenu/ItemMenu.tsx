import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { MenuItem } from '../../../../interfaces';

export const ItemMenu = (props: MenuItem) => {
  const router = useRouter();

  return (
    <div
      className={`flex justify-center items-center w-[180px] h-[42px] lg:w-auto lg:px-4 ${
        router.pathname == props.href ? 'border-2 border-secondary rounded-3xl' : ''
      }`}
    >
      <Link href={props.href}>
        <a className="cursor-pointer text-white capitalize font-orelega text-[20px] font-normal">{props.text}</a>
      </Link>
    </div>
  );
};
