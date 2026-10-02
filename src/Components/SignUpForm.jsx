import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { AuthService } from "../services/authService";
import { useTheme } from "../Context/ThemeContext";
import { toast } from "react-toastify";

export const SignUpForm = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!email || !password || !confirmPassword) {
      toast.warning("Please enter all required fields", { theme: "colored" });
      return;
    }

    if (password !== confirmPassword) {
      toast.warning("Passwords do not match", { theme: "colored" });
      return;
    }

    if (password.length < 6) {
      toast.warning("Password must be at least 6 characters long", { theme: "colored" });
      return;
    }

    try {
      setIsSubmitting(true);
      await AuthService.signUpWithEmail(email, password);
      toast.success("Account created successfully", { theme: "colored" });
      handleClose();
    } catch (err) {
      toast.error(err.message || "Failed to create account", { theme: "colored" });
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
      <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
        {isSubmitting ? "Creating Account..." : "Sign Up"}
      </Button>
    </Box>
  );
};

export default SignUpForm;
