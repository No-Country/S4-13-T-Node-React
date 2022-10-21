import React from 'react';
import Spinner from './spinner/Spinner';

const Loading = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-10 ">
      <h2 className="font-roboto w-[230px] text-center">{message}</h2>
      <Spinner />
    </div>
  );
};

export default Loading;
