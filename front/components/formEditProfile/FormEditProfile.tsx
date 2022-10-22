import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { v4 } from 'uuid';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../services/firebase';

import { useAxios } from '../../hooks/useAxios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { changeUserData, UserDataState } from '../../redux/slice/userDataSlice';
import LayoutProfile from '../layout/LayoutProfile';
import { handleModal, handleToOpen } from '../../redux/slice/modalSlice';
import { useRouter } from 'next/router';

const validateRegisterSchema = Yup.object({
  username: Yup.string().min(4, 'El nombre de usuario es demasiado corto'),
  email: Yup.string().email('Debes ingresar un email válido'),
});

const FormEditProfile = () => {
  const dispatch = useDispatch();
  const api = useAxios();
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const router = useRouter();

  const { data } = useSelector<RootState, UserDataState>(state => state.userDataReducer);

  const updateUser = async (values: { username: string; email: string }) => {
    dispatch(handleToOpen('loading'));
    const { email, username } = values;
    let newUserData: { username?: string; email?: string; avatar_url?: string } = {};
    if (imageUpload !== null) {
      const imageRef = ref(storage, `profilePics/${data?.user.id}.${imageUpload.name + v4()}`);
      await uploadBytes(imageRef, imageUpload)
        .then(async res => {
          await getDownloadURL(res.ref)
            .then(async avatar_url => {
              newUserData.avatar_url = await api
                .put(`/user/${data?.user.id}`, { avatar_url })
                .then(res => res.data.data.user.avatar_url)
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }

    if (username) {
      newUserData.username = await api
        .put(`/user/${data?.user.id}`, { username })
        .then(res => res.data.data.user.username)
        .catch(err => console.log(err));
    }

    if (email) {
      newUserData.email = await api
        .put(`/user/${data?.user.id}`, { email })
        .then(res => res.data.data.user.email)
        .catch(err => console.log(err));
    }

    dispatch(changeUserData({ ...newUserData }));
    dispatch(handleModal(false));

    router.reload();
  };

  return (
    <LayoutProfile heading="Editar perfil">
      <div className="flex flex-col gap-[24px] items-center">
        <div className="relative">
          <img
            src={data?.user.avatar_url!}
            className="pointer-events-none opacity-100 mt-6 ml-3 rounded-full border border-secondary w-[127px] h-[127px]"
          />
          <input
            className="hidden"
            type="file"
            name=""
            id="avatarInput"
            accept="image/*"
            onChange={e => {
              setImageUpload(e.target.files![0]);
            }}
          />
          <label
            htmlFor="avatarInput"
            className="w-[127px] h-[127px] flex flex-col justify-center absolute bottom-0 items-center gap-y-1 z-[100] ml-3 rounded-full cursor-pointer hover:bg-[#74726F]/75 transition-all ease-linear"
            onMouseOver={e => {
              if (e.target) {
                setMouseOver(true);
              }
            }}
            onMouseLeave={e => {
              if (e.target) {
                setMouseOver(false);
              }
            }}
          >
            {mouseOver ? (
              <>
                <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 5H17.8L16 3H10V5H15.1L17 7H21V19H5V10H3V19C3 20.1 3.9 21 5 21H21C22.1 21 23 20.1 23 19V7C23 5.9 22.1 5 21 5ZM8 13C8 17.45 13.39 19.69 16.54 16.54C19.69 13.39 17.45 8 13 8C10.24 8 8 10.24 8 13ZM13 10C13.7885 10.0226 14.5385 10.346 15.0962 10.9038C15.654 11.4615 15.9774 12.2115 16 13C15.9774 13.7885 15.654 14.5385 15.0962 15.0962C14.5385 15.654 13.7885 15.9774 13 16C12.2115 15.9774 11.4615 15.654 10.9038 15.0962C10.346 14.5385 10.0226 13.7885 10 13C10.0226 12.2115 10.346 11.4615 10.9038 10.9038C11.4615 10.346 12.2115 10.0226 13 10ZM5 5H8V3H5V0H3V3H0V5H3V8H5"
                    fill="#FDFDFD"
                  />
                </svg>
                <span className={`font-roboto text-xs text-white`}>Cambiar foto</span>
              </>
            ) : null}
          </label>
        </div>
        <Formik
          initialValues={{ username: '', email: '' }}
          onSubmit={async (values: { username: string; email: string }, { resetForm }) => {
            updateUser(values);
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
                  {errors.email && touched.email ? (
                    <div className="text-xs text-error mt-1.5">{errors.email}</div>
                  ) : null}
                </div>
                <div className="w-full flex justify-end gap-x-6 font-roboto">
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
      </div>
    </LayoutProfile>
  );
};

export default FormEditProfile;
