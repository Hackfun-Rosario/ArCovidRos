import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import Header from "../Header/index";

import cn from "classnames";

import { constants, session } from "utils";
import "./styles.scss";

interface LayoutProps {
  children: any;
}

const Layout = ({ children }: LayoutProps): ReactElement => {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
