import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Link,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedPassword = localStorage.getItem(username);
    if (storedPassword && storedPassword === password) {
      setToastMessage("Đăng nhập thành công!");
      setShowToast(true);
      // Dùng navigate thay cho navigate.push
      navigate("/admin/dashboard");
    } else {
      setToastMessage("Tên đăng nhập hoặc mật khẩu không đúng!");
      setShowToast(true);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        mt: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          borderRadius: 3,
          bgcolor: "background.paper",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          align="center"
          fontWeight="700"
          gutterBottom
          color="primary"
        >
          Đăng nhập Admin
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            label="Tên đăng nhập"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <TextField
            label="Mật khẩu"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={handleLogin}
            sx={{
              mt: 3,
              mb: 2,
              borderRadius: 3,
              fontWeight: "600",
              textTransform: "none",
              boxShadow:
                "0 4px 14px 0 rgba(25,118,210,0.39), 0 1px 4px 0 rgba(25,118,210,0.24)",
              "&:hover": {
                boxShadow:
                  "0 6px 20px 0 rgba(25,118,210,0.5), 0 3px 6px 0 rgba(25,118,210,0.3)",
              },
            }}
          >
            Đăng nhập
          </Button>
          <Box textAlign="center">
            <Link href="/reset-password" variant="body2" underline="hover">
              Quên mật khẩu?
            </Link>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={showToast}
        autoHideDuration={3000}
        onClose={() => setShowToast(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowToast(false)}
          severity={toastMessage.includes("thành công") ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
