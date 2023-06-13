import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppBar, Box, Modal, Tab, Tabs } from "@mui/material";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";
import { useTheme } from "../Context/ThemeContext";
import GoogleButton from "react-google-button";
import LogoutIcon from "@mui/icons-material/Logout";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import errorMapping from "../Utils/errorMapping";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const AccountCircle = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const { theme } = useTheme();
  const [user] = useAuthState(auth);

  const logout = () => {
    auth
      .signOut()
      .then((res) => {
        toast.success("Logged out successfully");
      })
      .catch((err) => {
        toast.error("Not Able to logout");
      });
  };
  const handleModalOpen = () => {
    if (user) {
      // navigate to user profile
      navigate("/user");
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleValuChange = (e, v) => {
    setValue(v);
  };

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((response) => {
        toast.success("Logged in successfully");
        handleClose();
      })
      .catch((err) => {
        console.log(err.code);
        toast.error(errorMapping[err.code] || "Some error occurred");
        console.log(err);
      });
  };
  return (
    <div>
      <AccountCircleIcon onClick={handleModalOpen} />
      {user && <LogoutIcon onClick={logout} />}
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "400px",
            textAlign: "center",
          }}
        >
          <AppBar
            position="static"
            style={{
              background: "transparent",
            }}
          >
            <Tabs value={value} onChange={handleValuChange} variant="fullWidth">
              <Tab label="login" style={{ color: theme.typeBoxText }}></Tab>
              <Tab label="signup" style={{ color: theme.typeBoxText }}></Tab>
            </Tabs>
          </AppBar>
          {value === 0 && (
            <h1>
              <LoginForm handleClose={handleClose} />
            </h1>
          )}
          {value === 1 && <SignUpForm handleClose={handleClose} />}
          <Box>
            <span>OR</span>
            <GoogleButton
              style={{
                width: "90%",
                borderRadius: "2px",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "8px",
              }}
              onClick={handleGoogleSignIn}
            />
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default AccountCircle;
