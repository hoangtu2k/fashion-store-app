import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setToastMessage('Mật khẩu không khớp!');
      setShowToast(true);
      return;
    }

    // Logic để lưu tài khoản (có thể gọi API ở đây)
    // Ví dụ: lưu vào localStorage
    localStorage.setItem(username, password);
    setToastMessage('Đăng ký thành công!');
    setShowToast(true);
    // Chuyển hướng đến trang đăng nhập hoặc thực hiện hành động khác
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '100px' }}>
      <Typography variant="h5" component="h1" align="center">
        Đăng ký Tài khoản
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
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Xác nhận Mật khẩu"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegister}
          style={{ marginTop: '20px' }}
        >
          Đăng ký
        </Button>
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

export default Register;
