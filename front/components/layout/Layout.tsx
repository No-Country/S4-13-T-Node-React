import React from 'react';
import { ChildrenProp } from '../../interfaces';
import Footer from '../footer/Footer';
import NavContainer from '../navbar/NavContainer';

function Layout(props: ChildrenProp) {
  return (
    <div className="min-h-full min-w-[100vw] flex flex-col items-center select-none">
      <NavContainer />
      {props.children}
      <Footer />
    </div>
  );
}

export default Layout;
