const DataUser = () => {
  const user = localStorage.getItem('user') || '';

  const { username, email } = JSON.parse(user);

  return (
    <div className="flex flex-col mt-11">
      <div className="border-b border-accent w-[173px] pb-6">
        <h2 className="text-text font-normal text-xl font-orelega">{username}</h2>
        <h5 className="font-roboto text-sm">{email}</h5>
      </div>
      <a className="font-roboto font-bold text-primary text-base mt-6" href="">
        Editar perfil
      </a>
    </div>
  );
};

export default DataUser;
