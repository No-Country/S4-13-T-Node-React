import Link from 'next/link';
import React from 'react';
import { FormLinksProps } from '../../interfaces';

const FormLinks = ({ question, anchor }: FormLinksProps) => {
  return (
    <div className="flex flex-row w-[295px] justify-end items-center gap-2 font-roboto mt-5 ">
      <p className="text-[12px]">{question}</p>
      <Link href="/login">
        <a className="text-primary font-bold ">{anchor}</a>
      </Link>
    </div>
  );
};

export default FormLinks;
