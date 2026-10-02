import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  AppBar,
  Box,
  Modal,
  Tab,
  Tabs,
  Tooltip,
} from "@mui/material";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { useTheme } from "../Context/ThemeContext";
import GoogleButton from "react-google-button";
import LogoutIcon from "@mui/icons-material/Logout";
import { auth } from "../firebaseConfig";
import { AuthService } from "../services/authService";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const AccountCircle = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const { theme } = useTheme();
  const [user] = useAuthState(auth);

  const iconStyle = {
    boxSizing: "border-box",
    marginTop: "18px",
    paddingLeft: "5px",
    scale: "1.5",
    cursor: "pointer",
    marginBottom: "auto",
  };

  const tooltipTitleStyle = {
    color: "white",
    fontSize: "16px",
  };

  const logout = async () => {
    try {
      await AuthService.signOutUser();
      toast.success("Logged out successfully", {
        theme: "colored",
      });
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Not able to logout", {
        theme: "colored",
      });
    }
  };

  const handleModalOpen = () => {
    if (user) {
      navigate("/user");
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleValueChange = (e, v) => {
    setValue(v);
  };

  const handleGoogleSignIn = async () => {
    try {
      await AuthService.signInWithGoogle();
      toast.success("Logged in successfully", {
        theme: "colored",
      });
      handleClose();
    } catch (err) {
      toast.error(err.message || "Failed to sign in with Google", {
        theme: "colored",
      });
    }
  };

  return (
    <div>
      <Tooltip
        title={<span style={tooltipTitleStyle}>Profile</span>}
        placement="top"
        enterDelay={500}
        arrow
        classes={{
          tooltip: "custom-tooltip",
        }}
      >
        <AccountCircleIcon
          onClick={handleModalOpen}
          style={{ ...iconStyle, marginRight: "8px" }}
        />
      </Tooltip>
      {user && (
        <Tooltip
          title={<span style={tooltipTitleStyle}>Logout</span>}
          placement="top"
          enterDelay={500}
          arrow
          classes={{
            tooltip: "custom-tooltip",
          }}
        >
          <LogoutIcon
            onClick={logout}
            style={{ ...iconStyle, marginRight: "4px" }}
          />
        </Tooltip>
      )}
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
            backgroundColor: theme.background,
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          }}
        >
          <AppBar
            position="static"
            style={{
              background: "transparent",
              boxShadow: "none",
            }}
          >
            <Tabs
              value={value}
              onChange={handleValueChange}
              variant="fullWidth"
              textColor="inherit"
              TabIndicatorProps={{ style: { backgroundColor: theme.title } }}
            >
              <Tab label="login" style={{ color: theme.typeBoxText }} />
              <Tab label="signup" style={{ color: theme.typeBoxText }} />
            </Tabs>
          </AppBar>
          {value === 0 && <LoginForm handleClose={handleClose} />}
          {value === 1 && <SignUpForm handleClose={handleClose} />}
          <Box>
            <span style={{ color: theme.typeBoxText }}>OR</span>
            <GoogleButton
              style={{
                width: "90%",
                borderRadius: "4px",
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
