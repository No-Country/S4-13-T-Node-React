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
      } left-12 border-2 border-primary rounded-b-xl w-[160.89px] min-h-[330px] z-[-40] px-6 pt-16 transition-all duration-500 ease-in select-none `}
    >
      {fakeTags.map(el => (
        <TagItem href={el.href} tag={el.tag} key={Math.random()} other={props.open} />
      ))}
    </div>
  );
};
