import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AxiosGetPost, IPost } from '../../interfaces';
import CardPost from './cardPost/CardPost';
import Loading from '../loading/Loading';
import { getPosts, PostsState, requestPosts } from '../../redux/slice/postsSlice';
import { RootState } from '../../redux/store';
import { useAxios } from '../../hooks/useAxios';

const PostsContainer = () => {
  const [postsList, setPostsList] = useState<IPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  const api = useAxios();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestPosts());
    api
      .get('/post')
      .then(({ data }: AxiosGetPost) => {
        const posts = data.data.posts;
        setPostsList(posts);
        dispatch(getPosts(posts));
      })
      .catch(err => setError(err));
  }, []);

  const { isLoading } = useSelector<RootState, PostsState>(state => {
    return state.postsReducer;
  });

  if (isLoading) {
    return <Loading message={'Enseguida te vas a reir con los mejores memes'} />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="px-2 mx-auto">
      {postsList
        ? postsList.map(post => (
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
        : 'loading...'}
    </div>
  );
};

export default PostsContainer;
