import { useState } from "react";
import { TextField, Button, IconButton, InputAdornment, Box, Typography, Paper } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo from "/SFL_logo.png";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";


  const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    usernameErr: false,
    usernameHelperText: "",
    passwordErr: false,
    passwordHelperText: "",
  });

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError({
        usernameErr: !username.trim(),
        usernameHelperText: !username.trim() ? "Please enter username" : "",
        passwordErr: !password.trim(),
        passwordHelperText: !password.trim() ? "Please enter password" : "",
      });
      return;
    }
    // setLoading(true);
    setError({ usernameErr: false, usernameHelperText: "", passwordErr: false, passwordHelperText: "" });
    try {
            const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
            if (!SECRET_KEY) {
              throw new Error("Encryption key is missing!");
            }
            const encryptedData = {
              UserName: CryptoJS.AES.encrypt(username, SECRET_KEY).toString(),
              Password: CryptoJS.AES.encrypt(password, SECRET_KEY).toString(),
            };
            console.log(encryptedData)
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.message || "Something went wrong");
          }

  };


  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: "url('/login-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        
        
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, textAlign: "center", position: "relative",borderRadius: 2, boxShadow: 3,borderTop: "5px solid #d9040c" }}>
        {/* <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "5px", backgroundColor: "red" }} /> */}
        <img src={logo} alt="Logo" width={150} style={{ marginBottom: 20 }} />
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={error.usernameErr}
            helperText={error.usernameHelperText}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaUser style={{ color: "gray", marginRight: 8 }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error.passwordErr}
            helperText={error.passwordHelperText}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaLock color="gray" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="error"
            fullWidth
            sx={{ mt: 2 ,backgroundColor: "#d9040c" ,boxShadow:"1px 1px 3px red"}}
           
          >
            {/* {loading ? <CircularProgress size={24} /> : "LOG IN"} */}
            LOG IN
          </Button>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Typography variant="body2" component="a" href="/auth/forgotpassword-page" color="primary" sx={{ color: "darkblue",textDecoration: "none" }}>
              Forgot Password?
            </Typography>
            <Typography variant="body2"  color="primary"  component="a" href="/auth/register-page"  sx={{ color: "darkblue",textDecoration: "none" }} >
              Don't have an account?
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;