import { useState } from 'react';
import CardPost from '../posts/cardPost/CardPost';
import { IPost } from '../../interfaces';
import TagsContainer from './TagsContainer';

function UpdatedMemesContainer() {
  const [postUpdated, setPostUpdated] = useState<Partial<IPost>>({});
  const { media_url, title, likesCount } = postUpdated;
  return (
    <div>
      <div>
        <CardPost
          // La propiedad imageUrl tira un error: Image is missing required "src" property. Al cargar la página
          imageUrl={media_url || '/assets/meme-1.png'}
          author="el bromas"
          title={'Lorem ipsum dolor sit amet'}
        />
        <p className="text-right mr-[31px] text-sm max-w-[344px] sm:mx-auto">12 me gusta</p>
      </div>
      <TagsContainer />
    </div>
  );
}

export default UpdatedMemesContainer;
