import React from 'react';
import { TagItem } from '../navbar/menu/tags/TagItem';

function TagsContainer() {
  const openTag = true;
  const fakeTags = [
    { tag: 'simpsons', href: '#' },
    { tag: 'no way home', href: '#' },
    { tag: 'mbappe', href: '#' },
    { tag: 'mundial', href: '#' },
    { tag: 'diosito', href: '#' },
  ];
  return (
    <div className="mx-6 border-b border-accent mb-4 max-w-[344px] sm:mx-auto">
      <h2 className="text-text font-roboto font-bold text-base mb-2">Tags</h2>
      <div className="flex flex-wrap gap-x-3 gap-y-2 pb-4">
        {fakeTags.map(el => (
          <TagItem href={el.href} tag={el.tag} key={Math.random()} other={openTag} />
        ))}
      </div>
    </div>
  );
}

export default TagsContainer;
