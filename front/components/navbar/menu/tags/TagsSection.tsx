import React from 'react';

import { TagsItemsCont } from './TagsItemsCont';
import useOpenTags from '../../../../hooks/useOpenTags';

const TagsSection = () => {
  const { handleOpen, openTag } = useOpenTags();

  return (
    <div className={'hidden lg:block lg:w-auto lg:mx-auto lg:items-center lg:h-12'}>
      <p
        onClick={handleOpen}
        className={`absolute top-[54px] left-12 text-primary font-bold border-2 ${
          openTag ? 'border-transparent' : 'border-primary'
        } rounded-b-3xl p-3.5 font-roboto text-[20px] z-[1] cursor-pointer transition-all duration-200 ease-linear select-none `}
      >
        {!openTag ? 'Tags' : 'Tags populares'}
      </p>
      <TagsItemsCont open={openTag} />
    </div>
  );
};

export default TagsSection;
