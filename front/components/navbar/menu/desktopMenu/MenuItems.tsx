import React from 'react';
import { ItemMenu } from '../hamburguerMenu/ItemMenu';
import { ProfileItem } from './ProfileItem';

const MenuItems = () => {
  return (
    <div className="hidden lg:flex lg:flex-row lg:items-center font-orelega lg:justify-center lg:gap-6 lg:pr-8 select-none">
      <ItemMenu href="/lo-nuevo" text="lo nuevo" />
      <ItemMenu href="#" text="mejores memes" />
      <ItemMenu href="#" text="memes random" />
      <ItemMenu href="#" text="favoritos" />
      <ProfileItem />
    </div>
  );
};

export default MenuItems;