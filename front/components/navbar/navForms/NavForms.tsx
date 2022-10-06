import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { test } from '../../../interfaces';

const NavForms = ({ title }: test) => {
  return (
    <div className="h-[93px] bg-primary w-full sm:w-[512px] lg:w-[1024px]  flex flex-row justify-between px-10 rounded-b-xl items-center">
      <h1 className="text-white font-orelega text-[24px] capitalize">{title}</h1>
      <Link href="/">
        <a>
          <Image src="/assets/logo/frame.png" width="134px" height="56px" className="object-contain" />
        </a>
      </Link>
    </div>
  );
};

export default NavForms;
