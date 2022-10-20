import React from 'react';
import FormLinks from '../formRegister/FormLinks';
import FormRegister from '../formRegister/FormRegister';
import { HrComponent } from '../formRegister/HrComponent';
import { MediaContainer } from '../formRegister/MediaContainer';
import LayoutFormPages from '../layout/LayoutFormPages';

const Signup = () => {
  return (
    <LayoutFormPages heading="registro">
      <div className="flex flex-col justify-center items-center">
        <FormRegister />
        <FormLinks question="¿ya tenés cuenta?" anchorText="Ingresá" />
        <HrComponent />
        <MediaContainer />
      </div>
    </LayoutFormPages>
  );
};

export default Signup;
