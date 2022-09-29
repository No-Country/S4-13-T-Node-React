import React, { useEffect, useState } from 'react';
import { IPost } from '../../interfaces';
import { getPost } from '../../services/api-calls';

const PostsContainer = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    getPost().then(posts => (posts ? setPosts(posts) : null));
  }, []);
  console.log(posts);
  return <div>PostsContainer</div>;
};

export default PostsContainer;
