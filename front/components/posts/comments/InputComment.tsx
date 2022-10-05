import { Form, Field, Formik } from 'formik';

interface CommentProps {
  comment: string;
}

const InputComment = () => {
  const handleSubmit = (values: CommentProps) => {
    console.log('Comentario enviado');
    console.log(values.comment);
  };

  return (
    <Formik
      initialValues={{
        comment: '',
      }}
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        resetForm();
      }}
    >
      {({ values }) => {
        return (
          <Form>
            <Field
              as="textarea"
              className="w-full px-4 py-3 h-[50px] font-roboto border-[1px] rounded resize-none focus:outline-none focus-visible:border-secondary"
              placeholder="Escribí aquí tu comentario"
              name="comment"
            />
            <div className="flex justify-end my-2">
              <button
                type="submit"
                className={`font-roboto font-bold text-primary text-base leading-[19px] border-2 border-primary rounded-lg py-2 px-4 active:text-secondary active:border-secondary ${
                  values.comment === '' && 'border-accent text-accent'
                }`}
                disabled={values.comment === ''}
              >
                Comentar
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default InputComment;
