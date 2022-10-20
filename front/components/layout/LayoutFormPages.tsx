import React from 'react';
import { HCProps } from '../../interfaces';
import NavForms from '../navbar/navForms/NavForms';

const LayoutFormPages = ({ children, heading }: HCProps) => {
  return (
    <div className="min-w-[340px] h-auto flex flex-col items-center select-none border-2 border-secondary rounded-3xl overflow-hidden bg-white pb-6">
      <NavForms title={heading} />
      {children}
    </div>
  );
};

export default LayoutFormPages;
