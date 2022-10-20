import React from 'react';
import { ChildrenProp } from '../../interfaces';

const Modal = (props: ChildrenProp) => {
  return (
    <div className="fixed z-50 h-full w-full min-h-[100vh] min-w-[100vw] flex flex-col justify-center items-center bg-black/[.35]">
      {props.children}
    </div>
  );
};

export default Modal;
