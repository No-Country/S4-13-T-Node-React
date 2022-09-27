import Link from 'next/link';
import React from 'react';
import { TagsItems } from './TagsItems';

const TagsSection = () => {
  return (
    <div className="absolute hidden lg:block lg:top-16 lg:left-14 lg:w-12 items-center">
      <p className=" text-primary pb-5 font-bold font-roboto text-[20px] capitalize">tags</p>
      <TagsItems />
    </div>
  );
};

export default TagsSection;
