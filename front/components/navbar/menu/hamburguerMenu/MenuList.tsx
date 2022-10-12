import React from 'react';
import { ItemMenu } from './ItemMenu';
import { ProfileItem } from './ProfileItem';
import { BiUserCircle } from 'react-icons/bi';

import { OpensProps } from '../../../../interfaces';

const MenuList = ({ open }: OpensProps) => {
  return (
    <div
      className={`absolute bg-primary rounded-b-xl z-[-1] left-0 text-center w-full py-20 transition-all duration-500 ease-in select-none ${
        open ? 'top-0' : 'top-[-500px]'
      } lg:hidden
      `}
    >
      <ItemMenu href="/" text="lo nuevo" />
      <ItemMenu href="/" text="mejores memes" />
      <ItemMenu text="memes random" href="/" />
      <ItemMenu text="favoritos" href="/favs" />
      <ProfileItem text="mi perfil" icon={<BiUserCircle />} />
    </div>
  );
};

export default MenuList;
