import React, { useEffect, useState } from 'react';
import { getPost } from '../../services/api-calls';

const PostsContainer = () => {
  useEffect(() => {
    getPost();
  }, []);

  return <div>PostsContainer</div>;
};

export default PostsContainer;
