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

interface FormValues {
  title: string;
  meme_url?: string;
  tags: string;
}

const FormUpload = () => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const { data } = useSelector<RootState, UserDataState>(state => state.userDataReducer);
  const dispatch = useDispatch();
  const api = useAxios(data?.access_token, data?.refresh_token, dispatch);

  const validateUploadSchema = Yup.object({
    title: Yup.string().min(6, '').required('Campo requerido'),
    meme_url: Yup.string().min(7, 'La url debe tener al menos 7 caracteres').required('Campo requerido').optional(),
    tags: Yup.string().min(1, 'El password debe tener al menos 1 tag').required('Campo requerido'),
  });

  const handleSubmit = (values: FormValues) => {
    const title = values.title;
    const tags = values.tags.split(',');
    if (imageUpload == null || values.meme_url) {
      const media_url = values.meme_url;
      api
        .post('/post', {
          title,
          tags,
          media_url,
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    } else {
      const imageRef = ref(storage, `memes/${data?.user.id}.${imageUpload.name + v4()}`);
      uploadBytes(imageRef, imageUpload)
        .then(res => {
          console.log(res);
          getDownloadURL(res.ref)
            .then(media_url => {
              console.log(media_url);
              api
                .post('/post', {
                  title,
                  tags,
                  media_url,
                })
                .then(res => console.log(res))
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
        console.log(values);
        handleSubmit(values);
        // resetForm();
      }}
      validationSchema={validateUploadSchema}
    >
      {({ values, errors, touched }) => {
        return (
          <Form className="flex flex-col gap-y-4">
            <label htmlFor="title" className="font-roboto text-[16px] font-bold leading-[18px]">
              Título
            </label>
            <Field
              className="w-full px-4 py-3 h-[50px] font-roboto border-[1px] rounded resize-none focus:outline-none focus-visible:border-secondary"
              name="title"
              id="title"
              placeholder="Título del meme"
            />
            {errors.title && touched.title ? <div className="text-xs">{errors.title}</div> : null}
            <div className="border-b-[0.5px]"></div>
            <label htmlFor="meme_url" className="font-roboto text-[16px] font-bold leading-[18px]">
              Meme
            </label>
            <div className="w-full">
              <p className="font-roboto text-center w-full">Podés agregar el link del meme</p>
              <Field
                className="w-full px-4 py-3 h-[50px] font-roboto border-[1px] rounded resize-none focus:outline-none focus-visible:border-secondary"
                name="meme_url"
                id="meme_url"
                placeholder="Link del meme"
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center">
              <p className="font-roboto text-center w-full">O cargarlo desde tu dispositivo</p>
              <div className="flex justify-center items-center w-[110px] border-primary border-2 rounded py-[8px] active:border-secondary cursor-pointer">
                <input
                  type="file"
                  id="upload"
                  className="hidden"
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
            <Field
              as="textarea"
              className="w-full px-4 py-3 h-[100px] font-roboto border-[1px] rounded resize-none focus-visible:ring-secondary focus-visible:border-none focus-visible:outline-none"
              placeholder="Escribí los tags separados por comas"
              name="tags"
              id="tags"
            />
            {errors.tags && touched.tags ? <div className="text-xs">{errors.tags}</div> : null}
            <div className="flex justify-end my-2">
              <button
                type="submit"
                className={`font-roboto font-bold text-primary text-base leading-[19px] border-2 border-primary rounded-lg py-2 px-4 active:text-secondary active:border-secondary ${
                  (values.title === '' || values.tags === '' || (values.meme_url === '' && imageUpload === null)) &&
                  'border-accent text-accent active:text-accent active:border-accent'
                } `}
                disabled={values.title === '' || values.tags === '' || (values.meme_url === '' && imageUpload === null)}
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
