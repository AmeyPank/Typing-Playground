import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "../Context/ThemeContext";
import { AuthService } from "../services/authService";
import { toast } from "react-toastify";

export const LoginForm = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!email || !password) {
      toast.warning("Please enter your email and password", {
        theme: "colored",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await AuthService.loginWithEmail(email, password);
      toast.success("Logged in successfully", {
        theme: "colored",
      });
      handleClose();
    } catch (err) {
      toast.error(err.message || "Failed to log in", {
        theme: "colored",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputLabelProps={{
          style: {
            color: theme.typeBoxText,
          },
        }}
        InputProps={{
          style: {
            color: theme.typeBoxText,
          },
        }}
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputLabelProps={{
          style: {
            color: theme.typeBoxText,
          },
        }}
        InputProps={{
          style: {
            color: theme.typeBoxText,
          },
        }}
      />
      <Button
        variant="contained"
        size="large"
        type="submit"
        disabled={isSubmitting}
        style={{ backgroundColor: theme.typeBoxText, color: theme.title }}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </Box>
  );
};

export default LoginForm;
