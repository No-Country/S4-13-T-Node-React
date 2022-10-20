import React from 'react';
import FormLogin from '../formLogin/FormLogin';
import FormLinks from '../formRegister/FormLinks';
import { HrComponent } from '../formRegister/HrComponent';
import { MediaContainer } from '../formRegister/MediaContainer';
import LayoutFormPages from '../layout/LayoutFormPages';

const Login = () => {
  return (
    <LayoutFormPages heading="ingreso">
      <div className="flex flex-col justify-center items-center">
        <FormLogin />
        <FormLinks question="¿no tenés cuenta?" anchor="/signup" anchorText="Registrate" />
        <HrComponent />
        <MediaContainer />
      </div>
    </LayoutFormPages>
  );
};

export default Login;
