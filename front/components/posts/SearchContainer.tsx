import { useSelector } from 'react-redux';
import { IPost } from '../../interfaces';
import CardPost from './cardPost/CardPost';
import Loading from '../loading/Loading';
import { PostsState } from '../../redux/slice/postsSlice';
import { RootState } from '../../redux/store';

const SearchContainer = ({ postsList, error }: { postsList: IPost[]; error?: string }) => {
  const { isLoading } = useSelector<RootState, PostsState>(state => {
    return state.postsReducer;
  });

  if (isLoading) {
    return <Loading message={'Buscando memes'} />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {postsList?.length &&
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
        ))}
    </>
  );
};

export default SearchContainer;
