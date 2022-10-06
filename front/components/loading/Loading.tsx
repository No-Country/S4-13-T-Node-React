import React from 'react';
import Spinner from './spinner/Spinner';

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[85vh] gap-10">
      <h2 className="font-roboto w-[230px] text-center">Enseguida te vas a reir con los mejores memes</h2>
      <Spinner />
    </div>
  );
};

export default Loading;
