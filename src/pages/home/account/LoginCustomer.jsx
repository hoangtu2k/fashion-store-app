import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";

export default function LoginCustomer() {
  const { loginCustomer } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      await loginCustomer(username, password);
      navigate("/account");
    } catch (err) {
      setError("Đăng nhập thất bại! Vui lòng kiểm tra email hoặc mật khẩu.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 550,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Đăng Nhập
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Đăng ký thành viên và nhận ngay ưu đãi 10% cho đơn hàng đầu tiên
        </Typography>

        {error && (
          <Typography variant="body2" color="error" mb={2}>
            {error}
          </Typography>
        )}

        <Stack spacing={2}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Mật khẩu"
            variant="outlined"
            fullWidth
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit" // Add type="submit" to trigger form submission
            variant="contained"
            fullWidth
            sx={{ py: 1.5, fontWeight: "bold", borderRadius: 2 }}
          >
            Đăng Nhập
          </Button>
        </Stack>

        <Typography
          variant="body2"
          mt={2}
          color="primary"
          sx={{ cursor: "pointer" }}
        >
          Quên mật khẩu?
        </Typography>

        <Typography variant="body2" mt={1}>
          Chưa có tài khoản?{" "}
          <Link to="/account/register" style={{ textDecoration: "none" }}>
            <Typography
              component="span"
              color="primary"
              fontWeight="bold"
              sx={{ cursor: "pointer" }}
            >
              Đăng ký ngay
            </Typography>
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}