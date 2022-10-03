import Image from 'next/image';
import React from 'react';

const Comments = () => {
  return (
    <div className="flex w-full gap-x-2">
      <div className="mt-1">
        <Image src="https://i.pravatar.cc/150?u=dapelu" width={36} height={36} className="rounded-full" />
      </div>
      <div className="flex flex-col font-roboto">
        <div>
          <p className="text-sm leading-[.5rem]">
            <span className="font-bold text-base mr-1.5">Autor</span>Comentario casdasda sa asdasd asd asd as das sa
          </p>
        </div>
        <div className="text-xs text-accent mt-2">
          <span className="mr-4">21 hs</span>
          <span className="cursor-pointer">Responder</span>
        </div>
      </div>
    </div>
  );
};

export default Comments;
