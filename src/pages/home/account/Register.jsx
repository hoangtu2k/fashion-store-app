import React, { useState } from "react";
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";  // import useNavigate
import { homeService } from "@api/homeService"; // chỉnh lại path đúng

const Register = () => {
    const navigate = useNavigate();  // khởi tạo navigate

    const [form, setForm] = useState({
        name: "",
        username: "",
        password: "",
        phone: "",
        email: "",
        dateOfBirth: "",
        address: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!form.name || !form.username || !form.password || !form.email) {
            setError("Vui lòng điền đầy đủ các trường bắt buộc.");
            return;
        }

        try {
            const res = await homeService.registerCustomer(form);
            setSuccess("Đăng ký thành công! Bạn sẽ được chuyển đến trang đăng nhập.");
            setForm({
                name: "",
                username: "",
                password: "",
                phone: "",
                email: "",
                dateOfBirth: "",
                address: "",
            });

            // Chuyển về trang login sau 2 giây
            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (err) {
            setError(err.response?.data || "Đã xảy ra lỗi, vui lòng thử lại sau.");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 1 }}>
            <Typography variant="h4" mb={3} mt={12} textAlign={"center"}>
                Đăng ký tài khoản
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {success}
                </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                    label="Họ và tên"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Tên đăng nhập"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Mật khẩu"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Số điện thoại"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Ngày sinh"
                    name="dateOfBirth"
                    type="date"
                    value={form.dateOfBirth}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                />
                <TextField
                    label="Địa chỉ"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={3}
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3 }}
                >
                    Đăng ký
                </Button>
            </Box>
        </Container>
    );
};

export default Register;
