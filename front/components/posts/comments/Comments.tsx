import { useState } from 'react';
import Image from 'next/image';
import InputComment from './InputComment';
import { IReply, IUser } from '../../../interfaces';
import Replies from './Replies';
import { calculateDates } from '../../../utils/calculateDates';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { UserDataState } from '../../../redux/slice/userDataSlice';
import { useAxios } from '../../../hooks/useAxios';

interface CommentsProps {
  message: string;
  user: IUser;
  createdAt: Date;
  replies?: IReply[] | null;
  id: string | number;
}

const Comments = ({ message, user, createdAt, replies, id }: CommentsProps) => {
  const [showInputResponse, setShowInputResponse] = useState<boolean>(false);

  const { data } = useSelector<RootState, UserDataState>(state => state.userDataReducer);

  const api = useAxios();

  const handleDeleteComment = () => {
    api
      .delete(`/comment/${id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <div className="flex w-full gap-x-2">
      <div className="min-w-[36px] min-h-[36px] mt-1 select-none">
        <Image src={user?.avatar_url!} width={36} height={36} className="rounded-full" />
      </div>
      <div className="flex flex-col font-roboto max-[260px] w-full">
        <div>
          <p className="text-sm leading-[.5rem]">
            <span className="font-bold text-base mr-1.5">{user?.username}</span>
            {message}
          </p>
        </div>
        <div className="flex gap-x-4 text-xs text-accent mt-2 select-none">
          <span>{calculateDates(createdAt)}</span>
          <span
            className="cursor-pointer active:text-secondary"
            onClick={() => setShowInputResponse(!showInputResponse)}
          >
            Responder
          </span>
          {user.username === data?.user.username && (
            <span className="cursor-pointer active:text-secondary" onClick={handleDeleteComment}>
              Eliminar
            </span>
          )}
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
        <Replies replies={replies || null} />
      </div>
    </div>
  );
};

export default Comments;
