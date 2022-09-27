import React from 'react';

import { FaSearch } from 'react-icons/fa';

import useSearchHook from '../../../hooks/useSearchHook';

export const Searchbar = () => {
  const { handleInput, handleSubmit } = useSearchHook();

  return (
    <form onSubmit={handleSubmit} className="absolute right-12 top-1 w-auto mx-auto lg:top-16 ">
      <input
        onChange={handleInput}
        name="search"
        className=" text-white placeholder:text-white peer cursor-pointer relative z-10 h-12 w-12 rounded-full border border-transparent bg-transparent pl-12 outline-none focus:w-56 focus:cursor-text focus:border-primary focus:pl-16 focus:pr-4 focus:mr-4 ease-linear duration-500"
        placeholder="search..."
      />
      <FaSearch
        className=" text-white absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-white peer-focus:stroke-primary 
      lg:text-primary lg:peer-focus:border-primary lg:outline lg:rounded-b lg:peer-focus:outline-none lg:h-16 lg:peer-focus:h-auto "
      />
    </form>
  );
};
