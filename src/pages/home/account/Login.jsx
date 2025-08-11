import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  InputAdornment,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    // Thêm xử lý đăng nhập ở đây
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",    
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

        <Stack spacing={2}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            variant="contained"
            fullWidth
            sx={{ py: 1.5, fontWeight: "bold", borderRadius: 2 }}
            onClick={handleLogin}
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
          <Typography
            component="span"
            color="primary"
            fontWeight="bold"
            sx={{ cursor: "pointer" }}
          >
            Đăng ký ngay
          </Typography>
        </Typography>
      </Paper>
    </Box>
  );
}
