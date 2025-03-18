import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Container, Grid, Paper, TextField, Typography, useMediaQuery, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [filled, setFilled] = useState(new Array(6).fill(false));
  const [open, setOpen] = useState(true);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const inputRefs = useRef([]);
  const otpGenerated = useRef(false);

  useEffect(() => {
    if (!otpGenerated.current) {
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(newOtp);
      console.log("Generated OTP:", newOtp);
      otpGenerated.current = true;  
    }
  }, []);

  // Handle input change
  const handleChange = (e, index) => {
    let value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      let newOtp = [...otp];
      let newFilled = [...filled];
      newOtp[index] = value;
      newFilled[index] = value !== "";
      setOtp(newOtp);
      setFilled(newFilled);

      // Move to the next input if not empty and within range
      if (value !== "" && index < 5) {
        inputRefs.current[index + 1].focus();
      }

      // Validate OTP when last digit is entered
      // if (index === 5 && value !== "") {
      //   validateOtp(newOtp.join(""));
      // }
    }
  };

  // Handle key press (Backspace moves to the previous input)
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Validate OTP (Replace with actual validation logic)
  const validateOtp = (enteredOtp) => {
    if (enteredOtp === generatedOtp) {
      alert("✅ OTP Verified Successfully!");
    } else {
      alert("❌ Invalid OTP. Please try again.");
    }
  };

  if (!open) return navigate("/auth/register-page");

  return (
    <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ padding: isMobile ? 2 : 4, borderRadius: 3, textAlign: "center", position: "relative" }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img src="/email-icon.png" alt="Email Verification" width={isMobile ? 60 : 80} height={isMobile ? 60 : 80} />
        </Box>
        <IconButton
          sx={{ position: "absolute", top: 10, right: 10, "&:hover": { color: "red" } }}
          onClick={() => setOpen(false)}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant={isMobile ? "h6" : "h5"} fontWeight={600} gutterBottom>
          Verify Your Email Address
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={2}>
          Please enter the 6-digit code sent to your email.
        </Typography>
        <Grid container spacing={1} justifyContent="center" sx={{ flexWrap: "nowrap" }}>
          {otp.map((digit, index) => (
            <Grid item key={index}>
              <TextField
                variant="outlined"
                size={isMobile ? "small" : "medium"}
                inputProps={{ maxLength: 1, style: { textAlign: "center", fontSize: "1.5rem" } }}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                inputRef={(el) => (inputRefs.current[index] = el)}
                sx={{
                  width: isMobile ? 40 : 50,
                  height: isMobile ? 40 : 60,
                  backgroundColor: filled[index] ? "#f0f0f0" : "white"
                }}
              />
            </Grid>
          ))}
        </Grid>
        <Typography variant="body2" mt={2}>
          Want to change your email? <Typography component="span" color="primary" sx={{ cursor: "pointer" }}>Change Here</Typography>
        </Typography>
        <Button
          variant="contained"
          color="warning"
          fullWidth
          onClick={() => validateOtp(otp.join(""))}
          sx={{ mt: 3, borderRadius: 3, padding: 1.5, backgroundColor: "red" }}
        >
          Verify Email
        </Button>
        <Typography variant="body2" mt={2} color="primary" sx={{ cursor: "pointer" }}>
          Resend Code
        </Typography>
      </Paper>
    </Container>
  );
};

export default EmailVerification;
