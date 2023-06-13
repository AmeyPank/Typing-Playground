import React from "react";
import AccountIcon from "./AccountCircle";

// import CompareButton from './CompareButton'

import LOGO from "../logo.png";
const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src={LOGO} alt="" />
      </div>
      <div className="user-logo" style={{ marginTop: "15px" }}>
        <AccountIcon />
      </div>
    </div>
  );
};

export default Header;
