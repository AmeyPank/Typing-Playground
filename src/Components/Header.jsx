import React from "react";
import AccountIcon from "./AccountCircle";
import KeyboardRoundedIcon from "@mui/icons-material/KeyboardRounded";
import NotificationsIcon from "@mui/icons-material/Notifications";
import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const iconStyle = {
    boxSizing: "border-box",
    marginTop: "18px",
    paddingRight: "5px",
    scale: "1.5",
    cursor: "pointer",
    marginBottom: "auto",
  };

  const tooltipTitleStyle = {
    color: "white",
    fontSize: "16px",
  };

  return (
    <div className="header">
      <div
        className="logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer", userSelect: "none" }}
      >
        <h1 style={{ fontFamily: "Lexend Deca", margin: 0 }}>funkeytype</h1>
        <span
          style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
        >
          <KeyboardRoundedIcon style={{ marginLeft: "8px" }} />
          <MilitaryTechIcon style={{ marginLeft: "8px" }} />
          <InfoIcon style={{ marginLeft: "8px" }} />
        </span>
      </div>
      <div
        className="user-logo"
        style={{
          marginTop: "15px",
          cursor: "pointer",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Tooltip
          title={<span style={tooltipTitleStyle}>Notification</span>}
          placement="top"
          enterDelay={500}
          arrow
          classes={{
            tooltip: "custom-tooltip",
          }}
        >
          <NotificationsIcon style={iconStyle} />
        </Tooltip>

        <AccountIcon />
      </div>
    </div>
  );
};

export default Header;
