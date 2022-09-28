import React from 'react';

import { TagsItemsCont } from './TagsItemsCont';
import useOpenTags from '../../../../hooks/useOpenTags';

const TagsSection = () => {
  const { handleOpen, openTag } = useOpenTags();

  return (
    <div className=" hidden lg:block lg:w-auto lg:mx-auto lg:items-center lg:h-12">
      <p
        onClick={handleOpen}
        className={`absolute top-[54px] left-14 text-primary border-2 ${
          openTag ? 'border-transparent' : 'border-primary'
        } rounded-b-lg p-3.5 font-normal font-roboto text-[20px] z-[1] capitalize cursor-pointer transition-all duration-500 ease-in select-none `}
      >
        tags
      </p>
      <TagsItemsCont open={openTag} />
    </div>
  );
};

export default TagsSection;
