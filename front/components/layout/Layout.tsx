import React from 'react';
import { ChildrenProp } from '../../interfaces';
import NavContainer from '../navbar/NavContainer';

function Layout(props: ChildrenProp) {
  return (
    <div className="min-h-full min-w-[100vw] flex flex-col items-center">
      <NavContainer />
      {props.children}
    </div>
  );
}

export default Layout;
