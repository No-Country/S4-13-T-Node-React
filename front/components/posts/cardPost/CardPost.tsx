import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { CardPostProps } from '../../../interfaces';
import LeftIcons from './LeftIcons';
import RightIcons from './RightIcons';

const CardPost = ({ id, imageUrl, author, title, hrefPost }: CardPostProps) => {
  const [imageHeight, setImageHeight] = useState<number>(0);

  return (
    <div className={`border-2 border-secondary rounded-3xl ${hrefPost ? 'mb-8' : ''} first:mt-4 py-2.5 w-[344px]`}>
      <div className="flex justify-between items-center font-roboto px-6 mt-1 mb-2">
        {hrefPost ? (
          <Link href={hrefPost}>
            <a>
              <p className="pointer">{title}</p>
            </a>
          </Link>
        ) : (
          <p className="pointer">{title}</p>
        )}

        <div className="flex flex-col justify-end text-primary font-bold cursor-pointer">
          <p className="leading-none">{author}</p>
        </div>
      </div>
      <div className="relative w-full">
        {hrefPost ? (
          <Link href={hrefPost}>
            <a>
              <Image
                src={imageUrl}
                width={340}
                height={imageHeight}
                onLoadingComplete={e => setImageHeight(e.naturalHeight)}
                alt="meme"
              />
            </a>
          </Link>
        ) : (
          <Image
            src={imageUrl}
            width={340}
            height={imageHeight}
            onLoadingComplete={e => setImageHeight(e.naturalHeight)}
            alt="meme"
          />
        )}
      </div>
      <div className="flex justify-between items-center p-2 mt-1">
        <LeftIcons hrefPost={hrefPost} />
        <RightIcons id={id} />
      </div>
    </div>
  );
};

export default CardPost;
