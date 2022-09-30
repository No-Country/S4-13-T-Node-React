import Image from 'next/image';
import React from 'react';
import { MDProps } from '../../interfaces';

const MediaButton = ({ social }: MDProps) => {
  return (
    <div className="w-[295px] h-[35px] border-[2px] border-primary rounded-[4px] cursor-pointer flex flex-row items-center justify-start px-2">
      <Image src={`/assets/${social}.png`} width="24px" height="24px" />
      <p className="font-roboto text-primary font-bold capitalize pl-12">Continuar con {social}</p>
    </div>
  );
};

export default MediaButton;
