import { Button, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function HeroSection() {
    return (
        <section className="hero-section">
            <Container>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography variant="h3" component="h1" className="hero-title">
                            Chào Mừng Đến Với MLB Shop
                        </Typography>
                        <Typography variant="body1" className="hero-text" paragraph>
                            Khám phá bộ sưu tập thời trang mới nhất với chất lượng hàng đầu và phong cách hiện đại.
                        </Typography>
                        <Button component={Link} to="/quan-ao" className="btn-custom">
                            Mua Sắm Ngay
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img
                            src="https://placehold.co/600x320?text=Hero+Image"
                            alt="Hero"
                            className="hero-image"
                        />
                    </Grid>
                </Grid>
            </Container>
        </section>
    )
}
