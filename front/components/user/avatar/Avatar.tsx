const Avatar = ({ user }: { user: any }) => {
  return (
    <div className="flex flex-col ">
      <div>
        <img
          className="pointer-events-none opacity-100 mt-6 ml-3 rounded-full border border-secondary w-[127px] h-[127px]"
          src={user?.avatar_url}
        />
      </div>
      <h3 className="ml-3 font-roboto text-center font-bold">{user.likesCount} me gusta totales</h3>
    </div>
  );
};

export default Avatar;
