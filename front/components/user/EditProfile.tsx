import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import { UserDataState } from '../../redux/slice/userDataSlice';
import { RootState } from '../../redux/store';
import FormEditProfile from '../formEditProfile/FormEditProfile';
import LayoutProfile from '../layout/LayoutProfile';
import Modal from '../modal/Modal';

const EditProfile = () => {
  const { data } = useSelector<RootState, UserDataState>(state => state.userDataReducer);

  return (
    <Modal>
      <LayoutProfile heading="Editar perfil">
        <div className="w-full flex flex-col justify-center items-center gap-y-4 font-roboto px-6 py-3">
          <div className="w-[127px] h-[127px] rounded-full overflow-hidden">
            <Image src={data?.user.avatar_url} width={127} height={127} />
          </div>
          <FormEditProfile />
        </div>
      </LayoutProfile>
    </Modal>
  );
};

export default EditProfile;
