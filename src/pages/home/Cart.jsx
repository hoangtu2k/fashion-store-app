import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Checkbox,
  Button,
  TextField,
  Divider,
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";


// Dữ liệu mock
const mockCart = [
  {
    id: 1,
    name: "Áo Thun Nam Basic",
    size: "L",
    code: "SP001",
    price: 250000,
    quantity: 2,
    image:
      "https://cdn.hstatic.net/products/200000642007/50sap_3atsb6853_1_7343bbd0f0dc4c3185a3117584a3df45_b5ee171de0d1435592fc14e7cebdb099_master.jpg"
  },
  {
    id: 2,
    name: "Quần Jeans Slim Fit",
    size: "32",
    code: "SP002",
    price: 450000,
    quantity: 1,
    image:
      "https://cdn.hstatic.net/products/200000642007/50sap_3atsb6853_1_7343bbd0f0dc4c3185a3117584a3df45_b5ee171de0d1435592fc14e7cebdb099_master.jpg"
  }
];

const Cart = () => {
  const [cart, setCart] = useState(mockCart);
  const [selected, setSelected] = useState([]);
  const [note, setNote] = useState("");

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(cart.map((item) => item.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelectItem = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((sid) => sid !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleDelete = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    setSelected(selected.filter((sid) => sid !== id));
  };

  const subtotal = cart
    .filter((item) => selected.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const shippingFee = subtotal > 0 ? 30000 : 0;
  const total = subtotal + shippingFee;

  return (
    <Box sx={{ p: 2, mt: 10, backgroundColor: "#f8f9fa" }}>
      <div className="row g-3">
        {/* Cột trái */}
        <div className="col-md-7">
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Checkbox
                checked={selected.length === cart.length && cart.length > 0}
                onChange={handleSelectAll}
              />
              <Typography variant="subtitle1">
                Chọn tất cả ({cart.length} sản phẩm)
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />

            {cart.map((item) => (
              <Box
                key={item.id}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  mb: 2,
                  p: 1.5,
                  borderRadius: 2,
                  backgroundColor: "#fff",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
                }}
              >
                <Box display="flex" alignItems="center" flex={1}>
                  <Checkbox
                    checked={selected.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                  />
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 1,
                      border: "1px solid #ddd",
                      mr: 2
                    }}
                  />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Size: {item.size} | Mã: {item.code}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "error.main", fontWeight: "bold" }}
                    >
                      {item.price.toLocaleString()} đ
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" alignItems="center">
                  <Typography variant="body2" sx={{ mr: 2 }}>
                    SL: {item.quantity}
                  </Typography>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Paper>
        </div>

        {/* Cột phải */}
        <div className="col-md-5">
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Thông tin đơn hàng
            </Typography>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Tạm tính</Typography>
              <Typography>{subtotal.toLocaleString()} đ</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Phí vận chuyển</Typography>
              <Typography>{shippingFee.toLocaleString()} đ</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                Tổng đơn
              </Typography>
              <Typography
                variant="subtitle1"
                color="error"
                fontWeight="bold"
              >
                {total.toLocaleString()} đ
              </Typography>
            </Box>

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Nhập ghi chú đơn hàng"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ borderRadius: 2, py: 1.2 }}
              disabled={subtotal === 0}
            >
              Thanh toán
            </Button>
          </Paper>
        </div>
      </div>
    </Box>
  );
};

export default Cart;
