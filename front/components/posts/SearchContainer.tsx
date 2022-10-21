import { IPost } from '../../interfaces';
import CardPost from './cardPost/CardPost';
import Loading from '../loading/Loading';

const SearchContainer = ({ postsList, error }: { postsList: IPost[]; error?: string }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {postsList?.length ? (
        postsList.map(post => (
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
      ) : (
        <Loading message={'Buscando memes'} />
      )}
    </>
  );
};

export default SearchContainer;
