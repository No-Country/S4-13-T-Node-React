import React from "react";
import HamburguerMenu from "./menu/hamburguerMenu/HamburguerMenu";
import { Searchbar } from "./searchbar/Searchbar";

const NavContainer = () => {
  return (
    <div className="bg-primary h-14 min-screen rounded-b-lg flex flex-row items-center">
      <div className="flex flex-row w-10">
        <HamburguerMenu />
        <Searchbar />
      </div>
    </div>
  );
};

export default NavContainer;
