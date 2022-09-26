import React from "react";
import { ChildrenProp } from "../../interfaces";
import NavContainer from "../navbar/NavContainer";

function Layout(props: ChildrenProp) {
  return (
    <div>
      <NavContainer />
      {props.children}
    </div>
  );
}

export default Layout;
