import React from "react";
import { BsSearch } from "react-icons/bs";

export const Searchbar = () => {
  return (
    <form className="relative w-max mx-auto">
      <input
        name="search"
        className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-lime-300 focus:pl-16 focus:pr-4 ease-linear duration-500"
      />
      <div className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-lime-300 peer-focus:stroke-lime-500">
        <BsSearch />
      </div>
    </form>
  );
};
