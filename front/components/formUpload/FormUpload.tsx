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

const FormUpload = () => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
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
        title: '',
        meme_url: '',
        tags: '',
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
            <label htmlFor="meme_url" className="font-roboto text-[16px] font-bold leading-[18px]">
              Meme
            </label>
            <div className="w-full">
              <p className="font-roboto text-center w-full">Podés agregar el link del meme</p>
              <div className="relative">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-5"
                >
                  <path
                    d="M4.22196 19.778C4.68584 20.2425 5.23693 20.6108 5.84358 20.8617C6.45023 21.1126 7.10048 21.2412 7.75696 21.24C8.41359 21.2411 9.06398 21.1126 9.67079 20.8617C10.2776 20.6108 10.8289 20.2425 11.293 19.778L14.121 16.949L12.707 15.535L9.87896 18.364C9.31543 18.925 8.55263 19.24 7.75746 19.24C6.96229 19.24 6.19949 18.925 5.63596 18.364C5.07447 17.8007 4.75917 17.0378 4.75917 16.2425C4.75917 15.4472 5.07447 14.6843 5.63596 14.121L8.46496 11.293L7.05096 9.879L4.22196 12.707C3.28577 13.6455 2.76001 14.9169 2.76001 16.2425C2.76001 17.5681 3.28577 18.8395 4.22196 19.778ZM19.778 11.293C20.7137 10.3543 21.2391 9.08292 21.2391 7.7575C21.2391 6.43208 20.7137 5.16072 19.778 4.222C18.8395 3.28581 17.568 2.76005 16.2425 2.76005C14.9169 2.76005 13.6454 3.28581 12.707 4.222L9.87896 7.051L11.293 8.465L14.121 5.636C14.6845 5.07499 15.4473 4.76003 16.2425 4.76003C17.0376 4.76003 17.8004 5.07499 18.364 5.636C18.9255 6.19927 19.2408 6.96217 19.2408 7.7575C19.2408 8.55283 18.9255 9.31573 18.364 9.879L15.535 12.707L16.949 14.121L19.778 11.293Z"
                    fill="#74726F"
                  />
                  <path d="M8.46407 16.95L7.04907 15.536L15.5361 7.05L16.9501 8.465L8.46407 16.95Z" fill="#74726F" />
                </svg>
                <Field
                  className="w-full px-12 py-3 h-[50px] font-roboto border-[1px] rounded resize-none focus:outline-none focus-visible:border-secondary"
                  name="meme_url"
                  id="meme_url"
                  placeholder="Link del meme"
                />
              </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center">
              <p className="font-roboto text-center w-full">O cargarlo desde tu dispositivo</p>
              <div className="flex justify-center items-center w-[110px] border-primary border-2 rounded py-[8px] active:border-secondary cursor-pointer">
                <input
                  type="file"
                  id="upload"
                  className="hidden"
                  accept="image/*"
                  onChange={e => {
                    setImageUpload(e.target.files![0]);
                  }}
                />
                <label htmlFor="upload" className="cursor-pointer">
                  <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1.25002 2.49597H14.748C14.938 2.49566 15.1207 2.4233 15.2594 2.29349C15.398 2.16368 15.4823 1.9861 15.4951 1.79659C15.5079 1.60709 15.4483 1.41978 15.3284 1.27248C15.2085 1.12518 15.0372 1.02886 14.849 1.00297L14.748 0.995972H1.25002C1.05999 0.99603 0.877074 1.06822 0.738224 1.19794C0.599373 1.32767 0.514942 1.50527 0.50199 1.69485C0.489038 1.88443 0.548531 2.07186 0.668448 2.21927C0.788365 2.36668 0.959765 2.46307 1.14802 2.48897L1.25002 2.49597ZM7.88302 20.994L8.00002 21C8.24495 20.9999 8.48135 20.91 8.66439 20.7473C8.84742 20.5845 8.96436 20.3602 8.99302 20.117L9.00002 20V7.40997L12.294 10.703C12.4662 10.8751 12.6953 10.9786 12.9383 10.9939C13.1814 11.0091 13.4216 10.9352 13.614 10.786L13.708 10.703C13.8802 10.5308 13.9836 10.3017 13.9989 10.0587C14.0142 9.81563 13.9403 9.57538 13.791 9.38297L13.708 9.28897L8.71102 4.29197C8.53882 4.11979 8.30972 4.01636 8.0667 4.00108C7.82367 3.9858 7.58342 4.05972 7.39102 4.20897L7.29702 4.29197L2.29302 9.28897C2.11176 9.46851 2.00598 9.71054 1.99733 9.96552C1.98868 10.2205 2.07781 10.4691 2.24648 10.6606C2.41515 10.852 2.6506 10.9717 2.90464 10.9952C3.15868 11.0187 3.41209 10.9442 3.61302 10.787L3.70702 10.704L7.00002 7.41497V20C6.9998 20.2451 7.08962 20.4817 7.2524 20.665C7.41518 20.8482 7.63959 20.9653 7.88302 20.994Z"
                      fill="#7F32EC"
                    />
                  </svg>
                </label>
              </div>
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
                Subir a Memex
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormUpload;
