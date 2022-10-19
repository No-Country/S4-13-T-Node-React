import { useState } from 'react';
import { IReply } from '../../../interfaces';
import Comments from './Comments';

const Replies = ({ replies }: { replies: IReply[] | null }) => {
  const [showResponse, setShowResponse] = useState<boolean>(false);

  const handleShowResponse = () => {
    setShowResponse(prev => !prev);
  };

  return (
    <>
      {replies?.length ? (
        <div className="flex flex-col pl-4 mt-2">
          <div className="flex items-center gap-x-1.5 text-xs text-accent">
            <div className="w-6 border-t-[1px]"></div>
            <p className="cursor-pointer active:text-secondary" onClick={handleShowResponse}>
              {showResponse ? `Ocultar respuestas(${replies.length})` : `Ver respuestas(${replies.length})`}
            </p>
          </div>
          <div
            className={`flex flex-col gap-y-3 mt-2 transition-all duration-500 ease-in-out select-none ${
              showResponse ? 'opacity-100 h-auto' : 'opacity-0 h-0'
            }`}
          >
            {showResponse ? (
              <>
                {replies?.map(reply => (
                  <Comments
                    key={reply.id}
                    createdAt={reply.created_at}
                    message={reply.reply}
                    replies={reply.replys}
                    user={reply.user}
                  />
                ))}
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Replies;
