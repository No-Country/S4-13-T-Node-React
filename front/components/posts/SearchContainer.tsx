import { IPost } from '../../interfaces';
import CardPost from './cardPost/CardPost';
import Loading from '../loading/Loading';
import Search404 from '../404/Search404';

const SearchContainer = ({ postsList, error }: { postsList: IPost[] | undefined; error?: string }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {postsList ? (
        postsList.length > 0 ? (
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
          <Search404 />
        )
      ) : (
        <Loading message={'Buscando memes'} />
      )}
    </>
  );
};

export default SearchContainer;
