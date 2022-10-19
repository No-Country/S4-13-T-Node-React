import { ItemMenu } from './ItemMenu';
import { ProfileItem } from './ProfileItem';

import { OpensProps } from '../../../../interfaces';
import Image from 'next/image';
import { RootState } from '../../../../redux/store';
import { useSelector } from 'react-redux';
import { UserDataState } from '../../../../redux/slice/userDataSlice';

const MenuList = ({ open }: OpensProps) => {
  const { data } = useSelector<RootState, UserDataState>(state => {
    return state.userDataReducer;
  });

  return (
    <div
      className={`flex flex-col justify-center items-center gap-y-4 absolute bg-primary/[.9] rounded-b-xl z-[-1] left-0 text-center w-full pt-20 pb-5 transition-all duration-500 ease-in select-none ${
        open ? 'top-0' : 'top-[-500px]'
      } lg:hidden
      `}
    >
      <ItemMenu href="/" text="lo nuevo" />
      <ItemMenu href="/best-memes" text="mejores memes" />
      <ItemMenu href="/random" text="memes random" />
      <ItemMenu href="/favs" text="favoritos" />
      <ProfileItem
        href={data?.user.id ? `/profile?id=${data?.user.id}` : '/login'}
        text="mi perfil"
        icon={
          !data?.access_token ? (
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.33325 16C1.33325 7.9 7.89992 1.33333 15.9999 1.33333C24.0999 1.33333 30.6666 7.9 30.6666 16C30.6666 24.1 24.0999 30.6667 15.9999 30.6667C7.89992 30.6667 1.33325 24.1 1.33325 16ZM6.54392 23.3893C4.95059 21.352 3.99992 18.7867 3.99992 16C4.00016 14.0946 4.45412 12.2167 5.32422 10.5216C6.19433 8.82649 7.45558 7.36295 9.00361 6.25207C10.5516 5.14118 12.3419 4.41489 14.2264 4.13329C16.1109 3.85169 18.0353 4.02287 19.8404 4.63267C21.6456 5.24247 23.2796 6.27336 24.6072 7.64004C25.9349 9.00673 26.918 10.6699 27.4752 12.492C28.0325 14.314 28.1479 16.2426 27.8118 18.1181C27.4757 19.9936 26.6978 21.7621 25.5426 23.2773C24.4212 21.8399 22.9865 20.6774 21.3478 19.8784C19.7091 19.0794 17.9097 18.6649 16.0866 18.6667C14.2396 18.6651 12.4172 19.0905 10.7618 19.9097C9.10645 20.729 7.66289 21.9199 6.54392 23.3893ZM8.43725 25.3173C10.5736 27.0565 13.2452 28.0041 15.9999 28C18.8034 28.0039 21.519 27.0223 23.6719 25.2267C22.8084 24.0211 21.6697 23.039 20.3505 22.3619C19.0312 21.6848 17.5695 21.3321 16.0866 21.3333C14.585 21.3323 13.1053 21.6939 11.7735 22.3876C10.4417 23.0812 9.29716 24.0863 8.43725 25.3173ZM19.7711 15.7712C20.7713 14.771 21.3332 13.4145 21.3332 12C21.3332 10.5855 20.7713 9.22895 19.7711 8.22875C18.7709 7.22856 17.4143 6.66666 15.9998 6.66666C14.5853 6.66666 13.2288 7.22856 12.2286 8.22875C11.2284 9.22895 10.6665 10.5855 10.6665 12C10.6665 13.4145 11.2284 14.771 12.2286 15.7712C13.2288 16.7714 14.5853 17.3333 15.9998 17.3333C17.4143 17.3333 18.7709 16.7714 19.7711 15.7712ZM17.8855 13.8856C18.3856 13.3855 18.6665 12.7072 18.6665 12C18.6665 11.2927 18.3856 10.6145 17.8855 10.1144C17.3854 9.61427 16.7071 9.33332 15.9998 9.33332C15.2926 9.33332 14.6143 9.61427 14.1142 10.1144C13.6141 10.6145 13.3332 11.2927 13.3332 12C13.3332 12.7072 13.6141 13.3855 14.1142 13.8856C14.6143 14.3857 15.2926 14.6667 15.9998 14.6667C16.7071 14.6667 17.3854 14.3857 17.8855 13.8856Z"
                fill="#F3ECE4"
              />
            </svg>
          ) : (
            <div className="rounded-full border-[1px] border-secondary w-[32px] h-[32px]">
              <Image src={data.user.avatar_url} width={32} height={32} layout="responsive" className="rounded-full" />
            </div>
          )
        }
      />
    </div>
  );
};

export default MenuList;
