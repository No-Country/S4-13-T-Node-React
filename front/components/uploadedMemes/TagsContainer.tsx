import React from 'react';
import { TagItem } from '../navbar/menu/tags/TagItem';

const TagsContainer = ({ tags }: { tags: string[] }) => {
  return (
    <div className="mx-6 border-b border-accent mb-4 max-w-[344px] sm:mx-auto">
      <h2 className="text-text font-roboto font-bold text-base mb-2">Tags</h2>
      <div className="flex flex-wrap gap-x-3 gap-y-2 pb-4">
        {tags.map((tag, idx) => (
          <TagItem tag={tag} key={idx} other />
        ))}
      </div>
    </div>
  );
};

export default TagsContainer;
