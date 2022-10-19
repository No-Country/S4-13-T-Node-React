import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { UserDataState } from '../../../redux/slice/userDataSlice';
import { RootState } from '../../../redux/store';

const DataUser = ({ user }: { user: any }) => {
  const router = useRouter();

  const id = parseInt(router.query.id as string);

  const { data } = useSelector<RootState, UserDataState>(state => state.userDataReducer);

  return (
    <div className="flex flex-col mt-11">
      <div className="border-b border-accent w-[173px] pb-6">
        <h2 className="text-text font-normal text-xl font-orelega break-all">{user?.username}</h2>
        {id == data?.user.id && <h5 className="font-roboto text-sm">{user?.email}</h5>}
      </div>
      {id == data?.user.id && (
        <a className="font-roboto font-bold text-primary text-base mt-6" href="/">
          Editar perfil
        </a>
      )}
    </div>
  );
};

export default DataUser;
