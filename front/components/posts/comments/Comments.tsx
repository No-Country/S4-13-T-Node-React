import { useState } from 'react';
import Image from 'next/image';

interface CommentsProps {
  response?: boolean;
}

const Comments = ({ response }: CommentsProps) => {
  const [showResponse, setShowResponse] = useState<boolean>(false);

  const handleShowResponse = () => {
    setShowResponse(prev => !prev);
  };

  return (
    <div className="flex w-full gap-x-2">
      <div className="mt-1">
        <Image src="https://i.pravatar.cc/150?u=dapelu" width={36} height={36} className="rounded-full" />
      </div>
      <div className="flex flex-col font-roboto max-[260px] w-full">
        <div>
          <p className="text-sm leading-[.5rem]">
            <span className="font-bold text-base mr-1.5">Autor</span>Comentario casdasda sa asdasd asd asd as das sa
          </p>
        </div>
        <div className="text-xs text-accent mt-2">
          <span className="mr-4">21 hs</span>
          <span className="cursor-pointer">Responder</span>
        </div>
        {response && (
          <div className="flex flex-col pl-4 mt-2">
            <div className="flex items-center gap-x-1.5 text-xs text-accent">
              <div className="w-6 border-t-[1px]"></div>
              <p className="cursor-pointer" onClick={handleShowResponse}>
                {showResponse ? 'Ocultar respuestas(2)' : 'Ver respuestas(2)'}
              </p>
            </div>
            <div
              className={`flex flex-col gap-y-3 mt-2 transition-all duration-500 ease-in-out select-none ${
                showResponse ? 'opacity-100 h-auto' : 'opacity-0 h-0'
              }`}
            >
              {showResponse ? (
                <>
                  <Comments /> <Comments />
                </>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
