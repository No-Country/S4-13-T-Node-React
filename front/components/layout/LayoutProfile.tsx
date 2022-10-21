import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HCProps } from '../../interfaces';

const LayoutProfile = ({ children, heading }: HCProps) => {
  return (
    <div className="min-w-[340px] h-auto flex flex-col items-center select-none border-2 border-secondary rounded-3xl overflow-hidden bg-white pb-6">
      <div className="h-[80px] bg-primary w-full flex flex-row justify-between px-10 rounded-b-xl items-center">
        <h1 className="text-white font-orelega text-[24px]">{heading}</h1>
        <Link href="/">
          <a>
            <Image src="/assets/logo/logoMobile.png" width="54px" height="43px" className="object-contain" />
          </a>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default LayoutProfile;
