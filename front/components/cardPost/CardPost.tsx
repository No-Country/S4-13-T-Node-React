import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BiBookmark, BiMessageRoundedDetail, BiShareAlt, BiHeart, BiLinkAlt } from 'react-icons/bi';
import { BsWhatsapp, BsInstagram } from 'react-icons/bs';
import { CardPostProps } from '../../interfaces';

const CardPost = ({ imageUrl, author, title, hrefPost }: CardPostProps) => {
  const [imageHeight, setImageHeight] = useState<number>(0);
  const [share, setShare] = useState(false);

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
        <div className="flex">
          <BiBookmark className="text-[30px] cursor-pointer text-primary mx-2" />
          {hrefPost ? (
            <Link href={hrefPost}>
              <a>
                <BiMessageRoundedDetail className="text-[30px] cursor-pointer text-primary mx-2" />
              </a>
            </Link>
          ) : (
            <Link href="#comments">
              <a>
                <BiMessageRoundedDetail className="text-[30px] cursor-pointer text-primary mx-2" />
              </a>
            </Link>
          )}
        </div>
        <div className="flex justify-around items-center">
          <div className={`flex transition-all gap-0 ${share ? 'gap-x-1.5' : ''}`} onClick={() => setShare(true)}>
            {share ? (
              <>
                <BsInstagram className="text-[28px] cursor-pointer text-primary mx-2" />
                <BsWhatsapp className="text-[28px] cursor-pointer text-primary mx-2" />
                <BiLinkAlt className="text-[30px] cursor-pointer text-primary mx-2" />
              </>
            ) : (
              <BiShareAlt className="text-[30px] cursor-pointer text-primary mx-2" />
            )}
          </div>
          <BiHeart className="text-[30px] cursor-pointer text-primary mx-2" />
        </div>
      </div>
    </div>
  );
};

export default CardPost;
