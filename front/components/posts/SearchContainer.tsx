import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';

import { IFav, IPost } from '../../interfaces';
import CardPost from './cardPost/CardPost';
import Loading from '../loading/Loading';
import { getPosts, PostsState, requestFailure, requestPosts } from '../../redux/slice/postsSlice';
import { RootState } from '../../redux/store';
import { getFavorites, UserDataState } from '../../redux/slice/userDataSlice';
import { useAxios } from '../../hooks/useAxios';

const SearchContainer = () => {
  const [postsList, setPostsList] = useState<IPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const api = useAxios();

  const { data } = useSelector<RootState, UserDataState>(state => state.userDataReducer);

  //   useEffect(() => {
  //     dispatch(requestPosts());
  //     api
  //       .get(`/user/${data?.user.id}/favorites`)
  //       .then(res => {
  //         const favorites = res.data.data.user.favorites.map((favorite: any) => favorite.post);
  //         setPostsList(favorites);
  //         dispatch(getFavorites(favorites));
  //         dispatch(getPosts(favorites));
  //       })
  //       .catch(err => setError(err));
  //   }, []);

  const { isLoading } = useSelector<RootState, PostsState>(state => {
    return state.postsReducer;
  });

  if (isLoading) {
    return <Loading message={'Buscando memes'} />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {/* postsList?.length && 
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
        )) */}
    </>
  );
};

export default SearchContainer;
