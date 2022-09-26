import React from "react";
import { Searchbar } from "./searchbar/Searchbar";

const NavContainer = () => {
  return (
    <div className="bg-primary h-14 min-w-full rounded-b-lg flex-row flex items-center ">
      <Searchbar />
    </div>
  );
};

export default NavContainer;
