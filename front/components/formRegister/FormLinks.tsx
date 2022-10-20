import React from 'react';
import { useDispatch } from 'react-redux';
import { FormLinksProps } from '../../interfaces';
import { handleToOpen } from '../../redux/slice/modalSlice';

const FormLinks = ({ question, anchor, anchorText }: FormLinksProps) => {
  const dispatch = useDispatch();
  const changeModal = () => {
    if (anchorText === 'Ingresá') {
      dispatch(handleToOpen('login'));
    } else if (anchorText === 'Registrate') {
      dispatch(handleToOpen('signup'));
    }
  };
  return (
    <div className="flex flex-row w-[295px] justify-end items-center gap-2 font-roboto mt-5 ">
      <p className="text-[12px]">{question}</p>
      <p className="text-primary font-bold cursor-pointer " onClick={changeModal}>
        {anchorText}
      </p>
    </div>
  );
};

export default FormLinks;
