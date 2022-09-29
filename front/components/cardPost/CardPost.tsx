import Image from 'next/image';
import React from 'react';
import { BiBookmark, BiMessageRoundedDetail, BiShareAlt, BiHeart } from 'react-icons/bi';

type CardPostProps = {
  srcImg: string;
  author: string;
  score?: number;
};

const CardPost = ({ srcImg, author, score }: CardPostProps) => {
  return (
    <div className="border-2 border-secondary rounded-3xl my-8 first:mt-4 py-2.5 w-[344px]">
      <div className="flex justify-between items-center font-roboto px-6 mt-1 mb-2">
        <p>Título del posteo</p>
        <div className="flex flex-col justify-end text-primary font-bold">
          <p className="leading-none">{author}</p>
          <p className="flex justify-end">{score && <span>{score}</span>}</p>
        </div>
      </div>
      <div className="w-full">
        <Image src={srcImg} layout="responsive" height={350} width={300} alt="meme" />
      </div>
      <div className="flex justify-between items-center p-2 mt-1">
        <div className="flex">
          <BiBookmark className="text-[30px] cursor-pointer text-primary mx-2" />
          <BiMessageRoundedDetail className="text-[30px] cursor-pointer text-primary mx-2" />
        </div>
        <div className="flex justify-around items-center">
          <BiShareAlt className="text-[30px] cursor-pointer text-primary mx-2" />
          <BiHeart className="text-[30px] cursor-pointer text-primary mx-2" />
        </div>
      </div>
    </div>
  );
};

export default CardPost;
