import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { MenuItem } from '../../../../interfaces';

export const ProfileItem = (props: MenuItem) => {
  const router = useRouter();

  return (
    <div
      className={`flex justify-center items-center w-[180px] h-[42px] lg:w-auto lg:px-4 ${
        router.asPath == props.href ? 'border-2 border-secondary rounded-3xl' : ''
      }`}
    >
      <Link href={props.href}>
        <a className="flex flex-row gap-2 text-white items-center justify-center text-[20px]">
          <h2 className="capitalize font-orelega">{props.text}</h2>
          {props.icon}
        </a>
      </Link>
    </div>
  );
};
