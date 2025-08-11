import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
            <Container className="footer-container">
                <Grid container spacing={3}>
                    <Grid item md={4} xs={12}>
                        <Typography variant="h5" className="footer-title">
                            Cửa Hàng
                        </Typography>
                        <Typography variant="body2" className="footer-text">
                            Cung cấp các sản phẩm thời trang chất lượng, mang đến trải nghiệm mua sắm tuyệt vời.
                        </Typography>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Typography variant="h5" className="footer-title">
                            Liên Kết Nhanh
                        </Typography>
                        <Stack direction="column">
                            <Button color="inherit" component={Link} to="/" className="nav-link">
                                Trang Chủ
                            </Button>
                            <Button color="inherit" component={Link} to="/cart" className="nav-link">
                                Giỏ Hàng
                            </Button>
                            <Button color="inherit" component={Link} to="/admin/login" className="nav-link">
                                Đăng Nhập
                            </Button>
                        </Stack>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Typography variant="h5" className="footer-title">
                            Liên Hệ
                        </Typography>
                        <Typography variant="body2" className="footer-text">
                            Email: contact@shop.com<br />
                            Điện thoại: 0123 456 789<br />
                            Địa chỉ: 123 Đường Mua Sắm, TP. HCM
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="body2" className="copyright" sx={{ mt: 2 }}>
                            &copy; 2025 Cửa Hàng. All rights reserved.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    )
}
