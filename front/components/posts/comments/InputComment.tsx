import { Form, Field, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useAxios } from '../../../hooks/useAxios';
import { addComment } from '../../../redux/slice/postSlice';
import { UserDataState } from '../../../redux/slice/userDataSlice';
import { RootState } from '../../../redux/store';

interface CommentProps {
  comment: string;
}
interface InputProps {
  id?: number | string;
}

const InputComment = ({ id }: InputProps) => {
  const { data } = useSelector<RootState, UserDataState>(state => state.userDataReducer);
  const dispatch = useDispatch();
  const user = data?.user;

  const api = useAxios();
  const handleSubmit = (values: CommentProps) => {
    api
      .post(`/post/${id}/comment`, { comment: values.comment })
      .then(res => {
        dispatch(
          addComment({
            comment: values.comment,
            email: user.email,
            username: user.username,
            avatar_url: user.avatar_url,
          })
        );
      })
      .catch(error => console.log(error));
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
              className="w-full px-4 py-3 h-[50px] font-roboto border-[1px] rounded resize-none focus-visible:ring-secondary focus:outline-none focus-visible:border-none"
              placeholder="Escribí aquí tu comentario"
              name="comment"
            />
            <div className="flex justify-end my-2">
              <button
                type="submit"
                className={`font-roboto font-bold text-primary text-base leading-[19px] border-2 border-primary rounded-lg py-2 px-4 ${
                  values.comment === '' && 'border-accent text-accent'
                } ${values.comment !== '' && 'active:text-secondary active:border-secondary'}`}
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
