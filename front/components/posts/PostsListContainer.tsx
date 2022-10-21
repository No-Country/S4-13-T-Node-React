import { IPost } from '../../interfaces';
import CardPost from './cardPost/CardPost';

const PostsListContainer = ({ postsList }: { postsList: IPost[] }) => {
  return (
    <>
      {postsList?.length
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
        : null}
    </>
  );
};

export default PostsListContainer;
