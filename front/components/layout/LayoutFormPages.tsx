import React from 'react';
import { HCProps } from '../../interfaces';
import NavForms from '../navbar/navForms/NavForms';

const LayoutFormPages = ({ children, heading }: HCProps) => {
  return (
    <div className="min-h-full min-w-[100vw] flex flex-col items-center">
      <NavForms title={heading} />
      {children}
    </div>
  );
};

export default LayoutFormPages;
