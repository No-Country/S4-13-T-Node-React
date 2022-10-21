import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { useAxios } from '../../hooks/useAxios';
import { useDispatch, useSelector } from 'react-redux';
import { handleToOpen } from '../../redux/slice/modalSlice';
import { RootState } from '../../redux/store';
import { UserDataState } from '../../redux/slice/userDataSlice';

const validateRegisterSchema = Yup.object({
  username: Yup.string()
    .min(4, 'El nombre de usuario es demasiado corto')
    .max(15, 'El nombre de usuario es demasiado largo')
    .required('Nombre de usuario requerido'),
  email: Yup.string().email('Debes ingresar un email válido').required('Email requerido'),
});

const FormEditProfile = () => {
  const dispatch = useDispatch();
  const api = useAxios();

  const { data } = useSelector<RootState, UserDataState>(state => state.userDataReducer);

  return (
    <>
      <Formik
        initialValues={{ username: '', email: '' }}
        onSubmit={async (values: { username: string; email: string }, { resetForm }) => {
          console.log(values);
        }}
        validationSchema={validateRegisterSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form className="flex flex-col justify-center align-center gap-4 select-none">
              <div>
                <label htmlFor="username" className="relative">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-5"
                  >
                    {errors.username && touched.username ? (
                      <path
                        d="M8 1.9C9.16 1.9 10.1 2.84 10.1 4C10.1 5.16 9.16 6.1 8 6.1C6.84 6.1 5.9 5.16 5.9 4C5.9 2.84 6.84 1.9 8 1.9ZM8 10.9C10.97 10.9 14.1 12.36 14.1 13V14.1H1.9V13C1.9 12.36 5.03 10.9 8 10.9ZM8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0ZM8 9C5.33 9 0 10.34 0 13V16H16V13C16 10.34 10.67 9 8 9Z"
                        fill="#FF0000"
                      />
                    ) : (
                      <path
                        d="M8 1.9C9.16 1.9 10.1 2.84 10.1 4C10.1 5.16 9.16 6.1 8 6.1C6.84 6.1 5.9 5.16 5.9 4C5.9 2.84 6.84 1.9 8 1.9ZM8 10.9C10.97 10.9 14.1 12.36 14.1 13V14.1H1.9V13C1.9 12.36 5.03 10.9 8 10.9ZM8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0ZM8 9C5.33 9 0 10.34 0 13V16H16V13C16 10.34 10.67 9 8 9Z"
                        fill="#74726F"
                      />
                    )}
                  </svg>

                  <Field
                    name="username"
                    id="username"
                    type="text"
                    autoComplete="off"
                    placeholder={data?.user.username}
                    className={`font-roboto border-[1px] border-accent rounded-[4px] w-[295px] px-12 py-3.5 focus:ring-secondary focus:border-secondary focus-visible:border-0 ${
                      errors.username && touched.username ? 'border-error text-error placeholder:text-error' : ''
                    }`}
                  />
                </label>
                {errors.username && touched.username ? (
                  <div className="text-xs text-error mt-1.5">{errors.username}</div>
                ) : null}
              </div>
              <div>
                <label htmlFor="email" className="relative">
                  <svg
                    width="20"
                    height="16"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-5"
                  >
                    {errors.email && touched.email ? (
                      <path
                        d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 14H2V4L10 9L18 4V14ZM10 7L2 2H18L10 7Z"
                        fill="#FF0000"
                      />
                    ) : (
                      <path
                        d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 14H2V4L10 9L18 4V14ZM10 7L2 2H18L10 7Z"
                        fill="#74726F"
                      />
                    )}
                  </svg>

                  <Field
                    name="email"
                    type="email"
                    placeholder={data?.user.email}
                    className={`font-roboto border-[1px] border-accent rounded-[4px] w-[295px] px-12 py-3.5 focus:ring-secondary focus:border-secondary focus-visible:border-0 ${
                      errors.email && touched.email ? 'border-error text-error placeholder:text-error' : ''
                    }`}
                  />
                </label>
                {errors.email && touched.email ? <div className="text-xs text-error mt-1.5">{errors.email}</div> : null}
              </div>
              <div className="w-full flex justify-end gap-x-6">
                <button className="font-bold text-primary text-base leading-[19px] active:text-secondary">
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="font-bold text-primary text-base leading-[19px] border-2 border-primary rounded-lg py-2 px-4 active:text-secondary active:border-secondary"
                >
                  Cambiar
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default FormEditProfile;
