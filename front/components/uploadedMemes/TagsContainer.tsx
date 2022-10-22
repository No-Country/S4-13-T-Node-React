import Link from 'next/link';
import React from 'react';

const TagsContainer = ({ tags }: { tags: string[] }) => {
  return (
    <div className="mx-6 border-b border-accent mb-4 max-w-[344px] sm:mx-auto">
      <h2 className="text-text font-roboto font-bold text-base mb-2">Tags</h2>
      <div className="flex flex-wrap gap-x-3 gap-y-2 pb-4">
        {tags.map((tag, idx) => (
          <Link href={`/search?tag=${tag}`} key={idx}>
            <a>
              <p
                className={
                  'text-primary font-roboto text-[16px] capitalize text-center py-2 px-4 cursor-pointer z-[-1] rounded-[50px] border-2 border-secondary block opacity-100'
                }
              >
                {tag.toLowerCase()}
              </p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagsContainer;
