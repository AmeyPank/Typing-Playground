import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { UserMapper } from "../mappers/UserMapper";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";

const UserInfo = ({ totalTestsTaken = 0 }) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { theme } = useTheme();

  if (!user) {
    return null;
  }

  const userProfile = UserMapper.toUserProfileDto(user);

  return (
    <div className="user-profile">
      <div className="user">
        <div className="picture">
          <PersonOutlineIcon
            style={{
              transform: "scale(4)",
              margin: "auto",
              marginTop: "3rem",
            }}
          />
        </div>
        <div className="info">
          <div className="name" style={{ fontWeight: "bold" }}>
            {userProfile.displayName}
          </div>
          <div className="email" style={{ fontSize: "1rem", marginTop: "4px" }}>
            {userProfile.email}
          </div>
          <div
            className="joined-at"
            style={{ fontSize: "0.85rem", opacity: 0.8, marginTop: "6px" }}
          >
            Joined: {userProfile.creationTime}
          </div>
        </div>
      </div>
      <div className="total-tests">
        <span style={{ fontSize: "1.8rem" }}>
          Total Tests: {totalTestsTaken}
        </span>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          style={{
            marginTop: "1rem",
            backgroundColor: theme.background,
            color: theme.title,
          }}
        >
          Take Test Again
        </Button>
      </div>
    </div>
  );
};

export default UserInfo;
