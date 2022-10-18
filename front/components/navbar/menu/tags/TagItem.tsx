import Link from 'next/link';
import React from 'react';

import { TagProps } from '../../../../interfaces';

export const TagItem = (props: TagProps) => {
  return (
    <Link href={props.href}>
      <a>
        <p
          className={`text-primary font-roboto text-[16px] capitalize text-center py-2 px-4 cursor-pointer z-[-1] rounded-[50px] border-2 border-secondary hover:bg-orange transition-all ease-linear duration-300 ${
            props.other ? 'block' : 'hidden'
          }`}
        >
          {props.tag}
        </p>
      </a>
    </Link>
  );
};
