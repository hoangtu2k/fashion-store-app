import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';

const ResetPassword = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleResetPassword = () => {
    // Logic để kiểm tra tài khoản và cập nhật mật khẩu (có thể gọi API ở đây)
    const storedPassword = localStorage.getItem(username);
    if (!storedPassword) {
      setToastMessage('Tài khoản không tồn tại!');
      setShowToast(true);
      return;
    }

    // Cập nhật mật khẩu
    localStorage.setItem(username, newPassword);
    setToastMessage('Mật khẩu đã được cập nhật!');
    setShowToast(true);
    // Chuyển hướng đến trang đăng nhập hoặc thực hiện hành động khác
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '100px' }}>
      <Typography variant="h5" component="h1" align="center">
        Lấy lại Mật khẩu
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
          label="Mật khẩu mới"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleResetPassword}
          style={{ marginTop: '20px' }}
        >
          Cập nhật Mật khẩu
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

export default ResetPassword;
