import React, { useEffect, useState } from 'react';
import { IPost } from '../../interfaces';
import { getPost } from '../../services/api-calls';
import CardPost from '../cardPost/CardPost';

const PostsContainer = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    getPost().then(posts => (posts ? setPosts(posts) : null));
  }, []);
  return (
    <div className="px-2 mx-auto">
      {posts
        ? posts.map(post => (
            <CardPost
              key={Math.random() * 999}
              imageUrl={post.media_url}
              author="anonimous"
              title={post.title}
              hrefPost={{ pathname: '/post', query: { id: post.id } }}
            />
          ))
        : 'loading...'}
    </div>
  );
};

export default PostsContainer;
