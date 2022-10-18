import React from 'react';

import { TagItem } from './TagItem';
import { OpensProps } from '../../../../interfaces';

export const TagsItemsCont = (props: OpensProps) => {
  const fakeTags = [
    { tag: 'simpsons', href: '#' },
    { tag: 'no way home', href: '#' },
    { tag: 'mbappe', href: '#' },
    { tag: 'mundial', href: '#' },
    { tag: 'diosito', href: '#' },
  ];

  return (
    <div
      className={`absolute ${
        props.open ? 'top-[53px]' : 'top-[-400px]'
      } left-12 border-2 border-primary rounded-b-3xl w-[212px] min-h-[420px] z-[-40] px-6 transition-all duration-500 ease-in select-none flex flex-col justify-center items-start gap-4`}
    >
      {fakeTags.map(el => (
        <TagItem href={el.href} tag={el.tag} key={Math.random()} other={props.open} />
      ))}
    </div>
  );
};
