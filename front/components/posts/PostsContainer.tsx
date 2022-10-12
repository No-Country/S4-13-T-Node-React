import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IPost } from '../../interfaces';
import { getPost } from '../../services/api-calls';
import CardPost from './cardPost/CardPost';
import Loading from '../loading/Loading';
import { getPosts, PostsState } from '../../redux/slice/postsSlice';
import { RootState } from '../../redux/store';

const PostsContainer = () => {
  const [postsList, setPostsList] = useState<IPost[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getPost().then(data => data && dispatch(getPosts(data)));
  }, []);

  const { isLoading, error, posts } = useSelector<RootState, PostsState>(state => {
    return state.postsReducer;
  });

  useEffect(() => {
    if (posts?.length) {
      setPostsList(posts);
    }
  }, [posts]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div> Error: {error}</div>;
  }

  return (
    <div className="px-2 mx-auto">
      {postsList
        ? postsList.map(post => (
            <CardPost
              key={post.id}
              id={post.id}
              imageUrl={post.media_url}
              author={post.user.username}
              title={post.title}
              hrefPost={{ pathname: '/post', query: { id: post.id } }}
            />
          ))
        : 'loading...'}
    </div>
  );
};

export default PostsContainer;
