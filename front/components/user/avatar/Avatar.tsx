import { useState } from 'react';

const Avatar = ({ user, likes = true }: { user: any; likes?: boolean }) => {
  const [mouseOver, setMouseOver] = useState<boolean>(false);

  return (
    <div className="flex flex-col ">
      <div className="relative">
        <input
          className={`opacity-0 mt-6 ml-3 rounded-full border border-secondary w-[127px] h-[127px] ${!likes ? '' : ''}`}
          type="file"
          name=""
          id=""
        />
        <img
          className={`pointer-events-none absolute bottom-0 opacity-100 mt-6 ml-3 rounded-full border border-secondary w-[127px] h-[127px] ${
            !likes ? '' : ''
          }`}
          src={user?.avatar_url}
        />
        {!likes && (
          <div
            className="w-[127px] h-[127px] flex flex-col justify-center items-center gap-y-1 absolute bottom-0 z-[100] ml-3 rounded-full cursor-pointer hover:bg-[#74726F]/75 transition-all ease-linear"
            onMouseOver={e => {
              console.log(e);
              if (e.target) {
                setMouseOver(true);
              }
            }}
            onMouseLeave={e => {
              if (e.target) {
                setMouseOver(false);
              }
            }}
          >
            {mouseOver ? (
              <>
                <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 5H17.8L16 3H10V5H15.1L17 7H21V19H5V10H3V19C3 20.1 3.9 21 5 21H21C22.1 21 23 20.1 23 19V7C23 5.9 22.1 5 21 5ZM8 13C8 17.45 13.39 19.69 16.54 16.54C19.69 13.39 17.45 8 13 8C10.24 8 8 10.24 8 13ZM13 10C13.7885 10.0226 14.5385 10.346 15.0962 10.9038C15.654 11.4615 15.9774 12.2115 16 13C15.9774 13.7885 15.654 14.5385 15.0962 15.0962C14.5385 15.654 13.7885 15.9774 13 16C12.2115 15.9774 11.4615 15.654 10.9038 15.0962C10.346 14.5385 10.0226 13.7885 10 13C10.0226 12.2115 10.346 11.4615 10.9038 10.9038C11.4615 10.346 12.2115 10.0226 13 10ZM5 5H8V3H5V0H3V3H0V5H3V8H5"
                    fill="#FDFDFD"
                  />
                </svg>
                <span className={`font-roboto text-xs text-white`}>Cambiar foto</span>
              </>
            ) : null}
          </div>
        )}
      </div>
      {likes && <h3 className="ml-3 font-roboto text-center font-bold">{user.likesCount} me gusta totales</h3>}
    </div>
  );
};

export default Avatar;
