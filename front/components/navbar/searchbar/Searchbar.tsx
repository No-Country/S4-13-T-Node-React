import React from "react";

import { FaSearch } from "react-icons/fa";

import useSearchHook from "../../../hooks/useSearchHook";

export const Searchbar = () => {
  const { handleInput, handleSubmit } = useSearchHook();

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute right-0 top-1 w-auto mx-auto"
    >
      <input
        onChange={handleInput}
        name="search"
        className=" right-0 text-white placeholder:text-white peer cursor-pointer relative z-10 h-12 w-12 rounded-full border border-transparent bg-transparent pl-12 outline-none focus:w-80 focus:cursor-text focus:border-primary focus:pl-16 focus:pr-4 ease-linear duration-500"
        placeholder="Search..."
      />
      <FaSearch className=" text-white absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-lime-300 peer-focus:stroke-lime-500" />
    </form>
  );
};
