import { useEffect, useState } from 'react';
import { IPost } from '../../interfaces';
import { getPost } from '../../services/api-calls';
import CardPost from './cardPost/CardPost';
import Loading from '../loading/Loading';

const PostsContainer = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getPost().then(posts => {
      posts ? setPosts(posts) : null;
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="px-2 mx-auto">
      {posts
        ? posts.map(post => (
            <CardPost
<<<<<<< HEAD
              key={Math.random() * 999}
              imageUrl={post.media_url}
              author="anonimous"
=======
              key={post.id}
              imageUrl={post.media_url}
              author={post.user.username}
>>>>>>> d40b08905245a41eb125d59ecc54d34b03be26ef
              title={post.title}
              hrefPost={{ pathname: '/post', query: { id: post.id } }}
            />
          ))
        : 'loading...'}
    </div>
  );
};

export default PostsContainer;
