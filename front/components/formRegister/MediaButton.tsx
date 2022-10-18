import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MDProps } from '../../interfaces';

const NODE_ENV = process.env.NODE_ENV;

let BASE_URL: string | undefined;

if (NODE_ENV === 'production') {
  BASE_URL = process.env.NEXT_PUBLIC_API_URL_PRODUCTION;
} else {
  BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT;
}

const MediaButton = ({ social }: MDProps) => {
  return (
    <div className="w-[295px] h-[35px] border-[2px] border-primary rounded-[8px] cursor-pointer flex flex-row items-center justify-start px-2">
      <Image src={`/assets/${social}.png`} width="24px" height="24px" />
      <Link
        href={`${BASE_URL}/login/${social}`}
        passHref
        className="font-roboto text-primary font-bold capitalize pl-12"
      >
        {`Continuar con ${social}`}
      </Link>
    </div>
  );
};

export default MediaButton;
