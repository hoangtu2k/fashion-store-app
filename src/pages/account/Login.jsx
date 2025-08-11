import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Để chuyển hướng

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate(); // Sử dụng useHistory để chuyển hướng

  const handleLogin = () => {
    // Kiểm tra thông tin đăng nhập
    const storedPassword = localStorage.getItem(username);
    if (storedPassword && storedPassword === password) {
      // Đăng nhập thành công
      setToastMessage('Đăng nhập thành công!');
      setShowToast(true);
      navigate.push('/admin/dashboard'); // Chuyển hướng đến trang dashboard
    } else {
      // Đăng nhập thất bại
      setToastMessage('Tên đăng nhập hoặc mật khẩu không đúng!');
      setShowToast(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '100px' }}>
      <Typography variant="h5" component="h1" align="center">
        Đăng nhập Admin
      </Typography>
      <form noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Mật khẩu"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          style={{ marginTop: '20px' }}
        >
          Đăng nhập
        </Button>
        <Link href="/reset-password" variant="body2" style={{ display: 'block', marginTop: '10px', textAlign: 'center' }}>
          Quên mật khẩu?
        </Link>
      </form>

      {/* Toast thông báo */}
      <Snackbar open={showToast} autoHideDuration={3000} onClose={() => setShowToast(false)}>
        <Alert onClose={() => setShowToast(false)} severity="info">
          {toastMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
