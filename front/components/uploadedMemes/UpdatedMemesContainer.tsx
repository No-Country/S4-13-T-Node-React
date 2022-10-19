import { IPost } from '../../interfaces';
import CardPost from '../posts/cardPost/CardPost';
import TagsContainer from './TagsContainer';

const UpdatedMemesContainer = ({ post }: { post: IPost }) => {
  return (
    <div>
      <div>
        <CardPost
          imageUrl={post?.media_url || ''}
          title={post?.title}
          id={post?.id || Math.random()}
          hrefPost={{ pathname: '/post', query: { id: post?.id } }}
          authorId={post?.user?.id || ''}
          author={post.user?.username}
        />
        <p className="font-roboto text-right mr-[31px] mt-[-24px] text-sm max-w-[344px] sm:mx-auto">
          {post?.likesCount} me gusta
        </p>
      </div>
      <TagsContainer tags={post?.tags || []} />
    </div>
  );
};

export default UpdatedMemesContainer;
