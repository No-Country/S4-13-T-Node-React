import React from 'react';
import FormLinks from '../formRegister/FormLinks';
import FormRegister from '../formRegister/FormRegister';
import { HrComponent } from '../formRegister/HrComponent';
import { MediaContainer } from '../formRegister/MediaContainer';
import LayoutFormPages from '../layout/LayoutFormPages';
import Modal from './Modal';

const ModalSignup = () => {
  return (
    <Modal>
      <LayoutFormPages heading="registro">
        <div className="flex flex-col justify-center items-center">
          <FormRegister />
          <FormLinks question="¿ya tenés cuenta?" anchor="/login" achorText="Ingresá" />
          <HrComponent />
          <MediaContainer />
        </div>
      </LayoutFormPages>
    </Modal>
  );
};

export default ModalSignup;
