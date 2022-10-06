import Link from 'next/link';
import React from 'react';
import { MenuItem } from '../../../../interfaces';

export const ItemMenu = (props: MenuItem) => {
  return (
    <div className="py-3">
      <Link href={props.href}>
        <a className="cursor-pointer text-white capitalize font-orelega text-[20px] font-normal ">{props.text}</a>
      </Link>
    </div>
  );
};
