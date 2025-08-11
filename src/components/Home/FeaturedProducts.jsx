import { Button, Card, CardActions, CardContent, CardMedia, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function FeaturedProducts({ featuredItems }) {
    return (
        <section className="products-section">
            <Container>
                <Typography variant="h4" component="h2" className="products-title">
                    Sản Phẩm Nổi Bật
                </Typography>
                <div className="row">
                    {featuredItems.map((item) => (
                        <div className="col-12 col-sm-6 col-lg-3 mt-4" key={item.id}>
                            <Card className="product-card">
                                {/* Bọc hình ảnh và nội dung trong Link */}
                                <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <CardMedia
                                        component="img"
                                        height="160"
                                        image={item.image}
                                        alt={item.name}
                                    />
                                    <CardContent className="card-body">
                                        <Typography variant="h6" className="card-title">
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" className="card-text">
                                            {item.price.toLocaleString('vi-VN')}₫
                                        </Typography>
                                    </CardContent>
                                </Link>
                                <CardActions>
                                    <Button component={Link} to="/cart" className="btn-custom">
                                        Thêm vào giỏ
                                    </Button>
                                </CardActions>
                            </Card>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    )
}
