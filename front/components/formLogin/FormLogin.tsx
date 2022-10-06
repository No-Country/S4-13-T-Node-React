import { Formik, Form, Field } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';
import { login } from '../../redux/slice/userLoginSlice';
import { LoginProps } from '../../interfaces';
import Link from 'next/link';

import { AiFillEye } from 'react-icons/ai';
import { AiFillEyeInvisible } from 'react-icons/ai';
import useToggleView from '../../hooks/useToggleView';

const validateLoginSchema = Yup.object({
  email: Yup.string().email('Debes ingresar un email válido').required('Email requerido'),
  password: Yup.string().min(6, 'El password debe tener al menos 6 caracteres').required('Password requerido'),
});

const FormLogin = () => {
  const dispatch = useDispatch();

  const { handleToggle, toggleView } = useToggleView();

  return (
    <>
      {
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values: LoginProps, { resetForm }) => {
            dispatch(login(values));
            resetForm();
          }}
          validationSchema={validateLoginSchema}
        >
          {({ errors, touched }) => {
            return (
              <Form className="flex flex-col justify-center align-center mt-16 gap-2 select-none">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className=" font-roboto border-[1px] border-accent rounded-[4px] w-[295px] px-4 py-1"
                />
                {errors.email && touched.email ? <div className="text-xs">{errors.email}</div> : null}

                <div className="relative">
                  <Field
                    name="password"
                    type={`${toggleView ? 'text' : 'password'}`}
                    placeholder="Password"
                    className="font-roboto border-[1px] border-accent rounded-[4px] w-[295px] pl-4 py-1"
                  />
                  <div className="absolute top-2 right-5 text-xl">
                    <AiFillEye
                      className={`cursor-pointer ${toggleView ? 'hidden' : 'block'} `}
                      onClick={handleToggle}
                    />
                    <AiFillEyeInvisible
                      className={`cursor-pointer ${toggleView ? 'block' : 'hidden'} `}
                      onClick={handleToggle}
                    />
                  </div>
                </div>

                {errors.password && touched.password ? <div className="text-xs">{errors.password}</div> : null}
                <Link href="#">
                  <a className="text-[12px] font-roboto w-[295px] text-end my-2 hover:text-primary">
                    ¿olvidaste tu contraseña?
                  </a>
                </Link>
                <button
                  type="submit"
                  className="border-2 border-primary rounded-[8px] font-bold w-[295px] font-roboto px-4 py-1 text-primary"
                >
                  Login
                </button>
              </Form>
            );
          }}
        </Formik>
      }
    </>
  );
};

export default FormLogin;
