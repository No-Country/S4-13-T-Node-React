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
import { useRouter } from 'next/router';

interface FormValues {
  title: string;
  tags: string;
}

interface FormEditMemeProps {
  title: string;
  imageUrl: string;
  tags: string[];
  id: number;
}

const FormEditMeme = (props: FormEditMemeProps) => {
  const api = useAxios();
  const router = useRouter();
  const dispatch = useDispatch();

  const validateUploadSchema = Yup.object({
    title: Yup.string().min(6, '').required('Campo requerido'),
    tags: Yup.string().min(1, 'El post debe tener al menos 1 tag').required('Campo requerido'),
  });

  const handleSubmit = (values: FormValues) => {
    const title = values.title;
    const tags = values.tags.split(',');
    dispatch(handleToOpen('loading'));
    dispatch(handleModal(true));
    api
      .put(`/post/${props.id}`, { title, tags })
      .then(res => {
        dispatch(handleModal(false));
        router.push(`/post?id=${props.id}`);
      })
      .catch(err => console.log(err));
  };

  return (
    <Formik
      initialValues={{
        title: props.title,
        tags: props.tags.join(),
      }}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
      }}
      validationSchema={validateUploadSchema}
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
            {/* <div className={`pointer-events-none opacity-100 w-[344px] h-auto`}>
              <Image
                src={props.imageUrl}
                width={344}
                height={imageHeight > 1000 && imageWidth > 800 ? 800 : imageHeight}
                onLoadingComplete={e => {
                  setImageWidth(e.naturalWidth);
                  setImageHeight(e.naturalHeight);
                }}
                alt="meme"
              />
            </div> */}
            <div className="relative">
              <img
                src={props.imageUrl}
                className="pointer-events-none opacity-100 border border-secondary w-[340px] h-auto"
              />
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
                  (values.title === '' || values.tags.length < 0) &&
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
