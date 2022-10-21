import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AxiosGetPost, IPost } from '../../interfaces';
import CardPost from './cardPost/CardPost';
import Loading from '../loading/Loading';
import { getPosts, requestPosts } from '../../redux/slice/postsSlice';
import { useAxios } from '../../hooks/useAxios';

const PostsContainer = ({
  posts,
  isLoading,
  error,
}: {
  posts: IPost[] | undefined;
  isLoading: boolean;
  error: string | null;
}) => {
  if (isLoading) {
    return <Loading message={'Enseguida te vas a reir con los mejores memes'} />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="px-2 mx-auto">
      {posts
        ? posts.map(post => (
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
        : null}
    </div>
  );
};

export default PostsContainer;
