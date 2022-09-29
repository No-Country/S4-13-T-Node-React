import React, { useEffect, useState } from 'react';
import { IPost } from '../../interfaces';
import { getPost } from '../../services/api-calls';
import CardPost from '../cardPost/CardPost';

const PostsContainer = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    getPost().then(posts => (posts ? setPosts(posts) : null));
  }, []);
  console.log(posts);
  return (
    <div className="px-2 mx-auto">
      {posts
        ? posts.map(post => <CardPost imageUrl={post.mediaURL} author='anonimous' title={post.title} />)
        : 'loading...'}
    </div>
  );
};

export default PostsContainer;
