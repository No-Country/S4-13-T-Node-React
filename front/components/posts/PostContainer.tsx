import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { RootState } from '../../redux/store';
import { useRouter } from 'next/router';

import { AxiosGetPostById, IPost } from '../../interfaces';

import Loading from '../../components/loading/Loading';
import CardPost from './cardPost/CardPost';
import Comments from './comments/Comments';
import InputComment from './comments/InputComment';

import { getPost, PostState } from '../../redux/slice/postSlice';
import { useAxios } from '../../hooks/useAxios';
import Link from 'next/link';

const PostContainer = () => {
  const router = useRouter();
  const api = useAxios();

  const [postVisited, setPostVisited] = useState<Partial<IPost | null>>(null);
  const [showTags, setShowTags] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { comments, post } = useSelector<RootState, PostState>(state => {
    return state.postReducer;
  });

  const id = parseInt(router.query.id as string);

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      api
        .get(`/post/${id}`)
        .then(({ data }: AxiosGetPostById) => {
          const post = data.data.post;
          dispatch(getPost(post));
          setIsLoading(false);
        })
        .catch(err => {
          setError(err);
          setIsLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    setPostVisited(post);
  }, [post]);

  const handleShowTags = () => {
    setShowTags(prev => !prev);
  };

  if (isLoading) {
    return <Loading message={'Sorprendete con el meme que viene'} />;
  }

  if (error) {
    return <div> Error: {error}</div>;
  }

  return (
    <div className="flex flex-col min-w-screen w-full sm:w-[512px] lg:w-[1024px] mt-[56px]">
      <div className="flex w-full justify-around items-center mt-4 max-w-[344px] mx-auto">
        <h1 className="font-orelega text-[24px] leading-[26px]">Lo nuevo</h1>
        <div className="flex items-center gap-x-2">
          {/* TODO: Volver a la página anterior sin recargar la página */}
          <svg
            className="cursor-pointer active:text-secondary"
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => router.back()}
          >
            <path
              d="M15 6.99979H3.14L6.77 2.63979C6.93974 2.43557 7.0214 2.17229 6.99702 1.90786C6.97264 1.64344 6.84422 1.39953 6.64 1.22979C6.43578 1.06005 6.1725 0.978387 5.90808 1.00277C5.64365 1.02715 5.39974 1.15557 5.23 1.35979L0.23 7.35979C0.196361 7.40751 0.166279 7.45765 0.14 7.50979C0.14 7.55979 0.14 7.58979 0.0700002 7.63979C0.0246737 7.75445 0.000941121 7.8765 0 7.99979C0.000941121 8.12308 0.0246737 8.24513 0.0700002 8.35979C0.0700002 8.40979 0.0699999 8.43979 0.14 8.48979C0.166279 8.54193 0.196361 8.59206 0.23 8.63979L5.23 14.6398C5.32402 14.7527 5.44176 14.8434 5.57485 14.9057C5.70793 14.9679 5.85309 15 6 14.9998C6.23365 15.0002 6.46009 14.9189 6.64 14.7698C6.74126 14.6858 6.82496 14.5827 6.88631 14.4664C6.94766 14.35 6.98546 14.2227 6.99754 14.0918C7.00961 13.9608 6.99573 13.8287 6.95669 13.7031C6.91764 13.5775 6.8542 13.4608 6.77 13.3598L3.14 8.99979H15C15.2652 8.99979 15.5196 8.89443 15.7071 8.70689C15.8946 8.51936 16 8.265 16 7.99979C16 7.73457 15.8946 7.48022 15.7071 7.29268C15.5196 7.10514 15.2652 6.99979 15 6.99979Z"
              fill="#7F32EC"
            />
          </svg>

          <p className="font-orelega text-[20px] leading-[26px]">Comentarios</p>
        </div>
      </div>
      <div className="px-2 mx-auto">
        <CardPost
          // La propiedad imageUrl tira un error: Image is missing required "src" property. Al cargar la página
          imageUrl={postVisited?.media_url || ''}
          author={postVisited?.user?.username}
          title={postVisited?.title}
          id={id}
          authorId={postVisited?.user?.id || ''}
        />
      </div>
      <div className="flex flex-col w-full justify-around items-center max-w-[344px] mx-auto px-5 mb-4">
        <div className="w-full h-3 flex justify-end font-roboto">
          <p className="text-sm mt-1">{postVisited?.likesCount} me gusta</p>
        </div>
        <div className="flex w-full font-roboto text-primary font-bold mb-2">
          <div className="overflow-hidden">
            <span className="ml-1 cursor-pointer select-none" onClick={handleShowTags}>
              {showTags ? 'Ocultar Tags' : 'Ver Tags'}
            </span>
            <div
              className={`flex flex-wrap font-normal gap-2 mb-2 transition-all duration-100 ease-out select-none ${
                showTags ? 'opacity-100 h-auto my-2' : 'opacity-0 h-0'
              }`}
            >
              {postVisited?.tags?.map((tag, idx) => (
                <Link href={`/search?tag=${tag}`} key={idx}>
                  <a>
                    <p key={idx} className="border-2 border-secondary rounded-3xl text-center py-1 px-4">
                      {tag}
                    </p>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full border-t-[1px] mb-2"></div>
        <div className="w-full mt-2" id="comments">
          <InputComment id={id} />
        </div>
        <div className="flex flex-col gap-y-5 mt-6 mb-4 max-w-[344px] w-full">
          {comments.map(comment => {
            return (
              <Comments
                key={comment.id || v4()}
                message={comment.comment}
                user={comment.user}
                createdAt={comment.created_at!}
                replies={comment.replys}
                id={comment.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostContainer;
