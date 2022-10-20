import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';

import { IFav, IPost } from '../../interfaces';
import CardPost from './cardPost/CardPost';
import Loading from '../loading/Loading';
import { getPosts, PostsState, requestFailure, requestPosts } from '../../redux/slice/postsSlice';
import { RootState } from '../../redux/store';
import { getUserFavorites } from '../../services/api-calls';
import { getFavorites, UserDataState } from '../../redux/slice/userDataSlice';

const FavsContainer = () => {
  const [postsList, setPostsList] = useState<IPost[]>([]);

  const dispatch = useDispatch();

  const { data } = useSelector<RootState, UserDataState>(state => state.userDataReducer);

  useEffect(() => {
    dispatch(requestPosts());
    getUserFavorites(data?.user.id)
      .then(user => {
        user && dispatch(getFavorites(user.favorites.map((favorite: IFav) => favorite.post)));
        user && dispatch(getPosts(user.favorites.map((favorite: IFav) => favorite.post)));
      })
      .catch(err => dispatch(requestFailure(err)));
  }, []);

  const { isLoading, error, posts } = useSelector<RootState, PostsState>(state => {
    return state.postsReducer;
  });

  useEffect(() => {
    setPostsList(posts);
  }, [posts]);

  if (isLoading) {
    return <Loading message={'Los que elegiste como favoritos'} />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {postsList?.length ? (
        postsList.map(post => (
          <CardPost
            key={post.id}
            id={post.id}
            imageUrl={post.media_url || ''}
            author={post.user?.username}
            title={post.title}
            hrefPost={{ pathname: '/post', query: { id: post.id } }}
            authorId={post.user?.id || ''}
          />
        ))
      ) : (
        <>
          <h2 className="font-orelega text-[20px] leading-[22px] text-center w-[250px]">
            Todavía no tenés memes marcados como favoritos
          </h2>
          <div className="flex flex-col mt-4 gap-y-4">
            <Image src="/assets/favs-top.png" width={300} height={125} />
            <Image src="/assets/favs-bottom.png" width={300} height={125} />
          </div>
        </>
      )}
    </>
  );
};

export default FavsContainer;
