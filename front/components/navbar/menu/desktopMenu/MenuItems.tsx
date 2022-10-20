import { useSelector } from 'react-redux';
import { UserDataState } from '../../../../redux/slice/userDataSlice';
import { RootState } from '../../../../redux/store';
import { ItemMenu } from '../hamburguerMenu/ItemMenu';
import { ProfileItem } from './ProfileItem';

const MenuItems = () => {
  const { data } = useSelector<RootState, UserDataState>(state => {
    return state.userDataReducer;
  });

  return (
    <div className="hidden lg:flex lg:flex-row lg:items-center font-orelega lg:justify-center lg:gap-3 lg:pr-8 select-none">
      <ItemMenu href="/" text="lo nuevo" />
      <ItemMenu href="/best-memes" text="mejores memes" />
      <ItemMenu href="/random" text="memes random" />
      <ItemMenu href="/favs" text="favoritos" />
      <ProfileItem href={data?.user.id ? `/profile?id=${data?.user?.id}` : ''} text="mi perfil" />
    </div>
  );
};

export default MenuItems;
