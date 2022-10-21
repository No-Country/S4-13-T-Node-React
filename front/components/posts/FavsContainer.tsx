import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';

import CardPost from './cardPost/CardPost';
import Loading from '../loading/Loading';
import { requestPosts } from '../../redux/slice/postsSlice';
import { RootState } from '../../redux/store';
import { getFavorites, UserDataState } from '../../redux/slice/userDataSlice';
import { useAxios } from '../../hooks/useAxios';

const FavsContainer = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useDispatch();
  const api = useAxios();

  const { data, favorites } = useSelector<RootState, UserDataState>(state => state.userDataReducer);

  useEffect(() => {
    dispatch(requestPosts());
    api
      .get(`/user/${data?.user.id}/favorites`)
      .then(res => {
        const favorites = res.data.data.user.favorites;
        dispatch(getFavorites(favorites));
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading message={'Los que elegiste como favoritos'} />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {favorites?.length ? (
        favorites.map(favorite => (
          <CardPost
            key={favorite.post.id}
            id={favorite.post.id}
            imageUrl={favorite.post.media_url || ''}
            author={favorite.post.user?.username}
            title={favorite.post.title}
            hrefPost={{ pathname: '/post', query: { id: favorite.post.id } }}
            authorId={favorite.post.user?.id || ''}
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
