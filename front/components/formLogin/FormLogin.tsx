import { Formik, Form, Field } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { getData, getLikes } from '../../redux/slice/userDataSlice';
import { LoginProps } from '../../interfaces';
import Link from 'next/link';
import useToggleView from '../../hooks/useToggleView';
import { useAxios } from '../../hooks/useAxios';
import { handleModal } from '../../redux/slice/modalSlice';

const validateLoginSchema = Yup.object({
  username: Yup.string().min(5, 'El nombre debe tener al menos 5 caracteres').required('Campo requerido'),
  password: Yup.string().min(6, 'El password debe tener al menos 6 caracteres').required('Password requerido'),
});

const FormLogin = () => {
  const dispatch = useDispatch();
  const api = useAxios();

  const { handleToggle, toggleView } = useToggleView();

  return (
    <>
      {
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={(values: LoginProps, { resetForm }) => {
            api.post('/login', values).then(res => {
              const userData = res.data;
              dispatch(getData(userData));
              dispatch(handleModal(false));
              const id = userData.user.id;
              api
                .get(`/user/${id}/likes`)
                .then(response => {
                  const likes = response.data.data.user.likes;
                  dispatch(getLikes(likes));
                })
                .catch(err => console.log(err));
            });
            resetForm();
          }}
          validationSchema={validateLoginSchema}
        >
          {({ errors, touched }) => {
            return (
              <Form className="flex flex-col justify-center align-center mt-16 gap-4 select-none">
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
                      placeholder="Nombre o mail"
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
                  <label htmlFor="password" className="relative">
                    <svg
                      width="16"
                      height="21"
                      viewBox="0 0 16 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-5"
                    >
                      {errors.password && touched.password ? (
                        <path
                          d="M14 7H13V5C13 2.24 10.76 0 8 0C5.24 0 3 2.24 3 5V7H2C0.9 7 0 7.9 0 9V19C0 20.1 0.9 21 2 21H14C15.1 21 16 20.1 16 19V9C16 7.9 15.1 7 14 7ZM5 5C5 3.34 6.34 2 8 2C9.66 2 11 3.34 11 5V7H5V5ZM14 19H2V9H14V19ZM8 16C9.1 16 10 15.1 10 14C10 12.9 9.1 12 8 12C6.9 12 6 12.9 6 14C6 15.1 6.9 16 8 16Z"
                          fill="#FF0000"
                        />
                      ) : (
                        <path
                          d="M14 7H13V5C13 2.24 10.76 0 8 0C5.24 0 3 2.24 3 5V7H2C0.9 7 0 7.9 0 9V19C0 20.1 0.9 21 2 21H14C15.1 21 16 20.1 16 19V9C16 7.9 15.1 7 14 7ZM5 5C5 3.34 6.34 2 8 2C9.66 2 11 3.34 11 5V7H5V5ZM14 19H2V9H14V19ZM8 16C9.1 16 10 15.1 10 14C10 12.9 9.1 12 8 12C6.9 12 6 12.9 6 14C6 15.1 6.9 16 8 16Z"
                          fill="#74726F"
                        />
                      )}
                    </svg>

                    <Field
                      name="password"
                      id="password"
                      type={`${toggleView ? 'text' : 'password'}`}
                      placeholder="Password"
                      className={`font-roboto border-[1px] border-accent rounded-[4px] w-[295px] px-12 py-3.5 focus:ring-secondary focus:border-secondary focus-visible:border-0 ${
                        errors.password && touched.password ? 'border-error text-error placeholder:text-error' : ''
                      }`}
                    />
                    <div className="absolute top-1/2 transform -translate-y-1/2 right-5 text-xl">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`cursor-pointer ${toggleView ? 'hidden' : 'block'} `}
                        onClick={handleToggle}
                      >
                        <path
                          d="M12 6C15.79 6 19.17 8.13 20.82 11.5C19.17 14.87 15.79 17 12 17C8.21 17 4.83 14.87 3.18 11.5C4.83 8.13 8.21 6 12 6ZM12 4C7 4 2.73 7.11 1 11.5C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 11.5C21.27 7.11 17 4 12 4ZM12 9C13.38 9 14.5 10.12 14.5 11.5C14.5 12.88 13.38 14 12 14C10.62 14 9.5 12.88 9.5 11.5C9.5 10.12 10.62 9 12 9ZM12 7C9.52 7 7.5 9.02 7.5 11.5C7.5 13.98 9.52 16 12 16C14.48 16 16.5 13.98 16.5 11.5C16.5 9.02 14.48 7 12 7Z"
                          fill="#74726F"
                        />
                      </svg>

                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`cursor-pointer ${toggleView ? 'block' : 'hidden'} `}
                        onClick={handleToggle}
                      >
                        <path
                          d="M21.5001 11.5C21.5001 15.6421 18.0751 17.5 12 17.5C5.92487 17.5 2.5022 15.8145 2.5022 11.6724C2.5022 7.53024 5.92487 5.5 12 5.5C18.0751 5.5 21.5001 7.35786 21.5001 11.5Z"
                          fill="#FD8A09"
                        />
                        <path
                          d="M12 6C15.79 6 19.17 8.13 20.82 11.5C19.17 14.87 15.79 17 12 17C8.21 17 4.83 14.87 3.18 11.5C4.83 8.13 8.21 6 12 6ZM12 4C7 4 2.73 7.11 1 11.5C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 11.5C21.27 7.11 17 4 12 4ZM12 9C13.38 9 14.5 10.12 14.5 11.5C14.5 12.88 13.38 14 12 14C10.62 14 9.5 12.88 9.5 11.5C9.5 10.12 10.62 9 12 9ZM12 7C9.52 7 7.5 9.02 7.5 11.5C7.5 13.98 9.52 16 12 16C14.48 16 16.5 13.98 16.5 11.5C16.5 9.02 14.48 7 12 7Z"
                          fill="#7F32EC"
                        />
                      </svg>
                    </div>
                  </label>
                  {errors.password && touched.password ? (
                    <div className="text-xs text-error mt-1.5">{errors.password}</div>
                  ) : null}
                </div>
                <Link href="#">
                  <a className="text-[12px] font-roboto w-[295px] text-end my-2 hover:text-primary">
                    ¿olvidaste tu contraseña?
                  </a>
                </Link>
                <button
                  type="submit"
                  className="border-2 border-primary rounded-[8px] font-bold w-[295px] font-roboto px-4 py-1 text-primary active:text-secondary active:border-secondary"
                >
                  Ingresar
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
