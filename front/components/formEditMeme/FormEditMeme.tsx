import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { v4 } from 'uuid';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../services/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { UserDataState } from '../../redux/slice/userDataSlice';
import { useAxios } from '../../hooks/useAxios';
import { handleModal, handleToOpen } from '../../redux/slice/modalSlice';

interface FormValues {
  title: string;
  meme_url?: string;
  tags: string;
}

interface FormEditMemeProps {
  title: string;
  imageUrl: string;
  tags: string;
}

const FormEditMeme = (props: FormEditMemeProps) => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  const { data } = useSelector<RootState, UserDataState>(state => state.userDataReducer);
  const api = useAxios();
  const dispatch = useDispatch();

  const validateUploadSchema = Yup.object({
    title: Yup.string().min(6, '').required('Campo requerido'),
    meme_url: Yup.string().min(7, 'La url debe tener al menos 7 caracteres').required('Campo requerido').optional(),
    tags: Yup.string().min(1, 'El password debe tener al menos 1 tag').required('Campo requerido'),
  });

  const handleSubmit = (values: FormValues) => {
    const title = values.title;
    const tags = values.tags.split(',');
    dispatch(handleToOpen('loading'));
    dispatch(handleModal(true));
    if (imageUpload == null || values.meme_url) {
      const media_url = values.meme_url;
      api
        .post('/post', {
          title,
          tags,
          media_url,
        })
        .then(res => {
          dispatch(handleToOpen('upload'));
        })
        .catch(err => console.log(err));
    } else {
      const imageRef = ref(storage, `memes/${data?.user.id}.${imageUpload.name + v4()}`);
      uploadBytes(imageRef, imageUpload)
        .then(res => {
          getDownloadURL(res.ref)
            .then(media_url => {
              api
                .post('/post', {
                  title,
                  tags,
                  media_url,
                })
                .then(res => {
                  dispatch(handleToOpen('upload'));
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <Formik
      initialValues={{
        title: props.title,
        meme_url: props.imageUrl,
        tags: props.tags,
      }}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        // resetForm();
      }}
      // validationSchema={validateUploadSchema}
    >
      {({ values, errors, touched }) => {
        return (
          <Form className="flex flex-col gap-y-4">
            <label htmlFor="title" className="font-roboto text-[16px] font-bold leading-[18px]">
              Título
            </label>
            <div>
              <Field
                className="w-full px-4 py-3 h-[50px] font-roboto border-[1px] rounded resize-none focus:outline-none focus-visible:border-secondary"
                name="title"
                id="title"
                placeholder="Título del meme"
              />
              {errors.title && touched.title ? <div className="text-xs text-error mt-1.5">{errors.title}</div> : null}
            </div>
            <div className="border-b-[0.5px]"></div>
            <h3 className="font-roboto text-[16px] font-bold leading-[18px]">Meme</h3>
            <div className="relative">
              <img
                src={props.imageUrl}
                className="pointer-events-none opacity-100 mt-6 ml-3 border border-secondary w-[340px] h-auto"
              />
              <input
                className="hidden"
                type="file"
                name=""
                id="imageUrl"
                accept="image/*"
                onChange={e => {
                  setImageUpload(e.target.files![0]);
                }}
              />
              <label
                htmlFor="imageUrl"
                className="w-[340px] h-[127px] flex flex-col justify-center absolute bottom-0 items-center gap-y-1 z-[100] ml-3 cursor-pointer hover:bg-[#74726F]/75 transition-all ease-linear"
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
                    <span className={`font-roboto text-xs text-white`}>Cambiar imagen</span>
                  </>
                ) : null}
              </label>
            </div>
            <div className="border-b-[0.5px]"></div>
            <label htmlFor="tags" className="font-roboto text-[16px] font-bold leading-[18px]">
              Tags
            </label>
            <div>
              <Field
                as="textarea"
                className="w-full px-4 py-3 h-[100px] font-roboto border-[1px] rounded resize-none focus-visible:ring-secondary focus-visible:border-none focus-visible:outline-none"
                placeholder="Escribí los tags separados por comas"
                name="tags"
                id="tags"
              />
              {errors.tags && touched.tags ? <div className="text-xs text-error">{errors.tags}</div> : null}
            </div>
            <div className="flex justify-end my-2">
              <button
                type="submit"
                className={`font-roboto font-bold text-primary text-base leading-[19px] border-2 border-primary rounded-lg py-2 px-4 active:text-secondary active:border-secondary ${
                  (values.title === '' || values.tags === '' || (values.meme_url === '' && imageUpload === null)) &&
                  'border-accent text-accent active:text-accent active:border-accent'
                } `}
                // disabled={values.title === '' || values.tags === '' || (values.meme_url === '' && imageUpload === null)}
              >
                Guardar cambios
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormEditMeme;
