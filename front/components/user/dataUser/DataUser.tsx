import { useDispatch, useSelector } from 'react-redux';
import { handleModal, handleToOpen } from '../../../redux/slice/modalSlice';
import { UserDataState } from '../../../redux/slice/userDataSlice';
import { RootState } from '../../../redux/store';

const DataUser = ({ user, id }: { user: any; id: number }) => {
  const { data } = useSelector<RootState, UserDataState>(state => state.userDataReducer);

  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(handleToOpen('editProfile'));
    dispatch(handleModal(true));
  };
  return (
    <div className="flex flex-col mt-11">
      <div className="border-b border-accent w-[173px] pb-6">
        <h2 className="text-text font-normal text-xl font-orelega truncate">{user?.username}</h2>
        {id == data?.user.id && <h5 className="font-roboto text-sm">{user?.email}</h5>}
      </div>
      {id == data?.user.id && (
        <p onClick={openModal} className="font-roboto font-bold text-primary text-base mt-6 cursor-pointer">
          Editar perfil
        </p>
      )}
    </div>
  );
};

export default DataUser;
