import Link from 'next/link';
import React from 'react';

import { TagProps } from '../../../../interfaces';

export const TagItem = (props: TagProps) => {
  return (
    <p
      className={`text-primary font-roboto text-[16px] capitalize text-center py-2 px-4 cursor-pointer z-[-1] rounded-[50px] border-2 border-secondary transition-all ease-linear duration-300 ${
        props.other ? 'block opacity-100' : 'hidden opacity-0'
      }`}
    >
      {props.tag}
    </p>
  );
};
