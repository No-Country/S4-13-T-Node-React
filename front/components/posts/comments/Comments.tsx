import { useState } from 'react';
import Image from 'next/image';
import InputComment from './InputComment';

interface CommentsProps {
  response?: boolean;
}

const Comments = ({ response }: CommentsProps) => {
  const [showResponse, setShowResponse] = useState<boolean>(false);
  const [showInputResponse, setShowInputResponse] = useState<boolean>(false);

  const handleShowResponse = () => {
    setShowResponse(prev => !prev);
  };

  return (
    <div className="flex w-full gap-x-2">
      <div className="min-w-[36px] min-h-[36px] mt-1 select-none">
        <Image src="https://i.pravatar.cc/150?u=dapelu" width={36} height={36} className="rounded-full" />
      </div>
      <div className="flex flex-col font-roboto max-[260px] w-full">
        <div>
          <p className="text-sm leading-[.5rem]">
            <span className="font-bold text-base mr-1.5">Autor</span>Comentario casdasda sa asdasd asd asd as das sa
          </p>
        </div>
        <div className="text-xs text-accent mt-2 select-none">
          <span className="mr-4">21 hs</span>
          <span
            className="cursor-pointer active:text-secondary"
            onClick={() => setShowInputResponse(!showInputResponse)}
          >
            Responder
          </span>
        </div>
        <div
          className={`transition-all duration-500 ease-in-out ${
            showInputResponse ? 'opacity-100 h-auto mt-4' : 'opacity-0 h-0'
          }`}
        >
          {showInputResponse ? (
            <>
              <InputComment />
              <div className="w-full border-t-[1px] mb-2 mt-8"></div>
            </>
          ) : null}
        </div>
        {response && (
          <div className="flex flex-col pl-4 mt-2">
            <div className="flex items-center gap-x-1.5 text-xs text-accent">
              <div className="w-6 border-t-[1px]"></div>
              <p className="cursor-pointer active:text-secondary" onClick={handleShowResponse}>
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
