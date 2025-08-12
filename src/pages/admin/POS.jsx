import '@style/pos.css';
import React, { useState, useEffect, useRef } from 'react';
import {
  Container, Paper, TextField, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Tabs, Tab, Chip, Box, Snackbar, Alert, Button,
  Typography, InputAdornment, Autocomplete, List, ListItem, ListItemText,
  MenuItem, FormControl, InputLabel, Select
} from '@mui/material';
import {
  Home, Add, Remove, Delete, Close
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  width: '100vw',
  zIndex: 1100,
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.5),
  },
}));

const MainContent = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(8),
  left: 0,
  right: 0,
  bottom: 0,
  width: '100vw',
  maxWidth: '100vw',
  height: `calc(100vh - ${theme.spacing(8)})`,
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  backgroundColor: theme.palette.grey[100],
  margin: 0,
  padding: 0,
  [theme.breakpoints.down('sm')]: {
    top: theme.spacing(7),
    height: `calc(100vh - ${theme.spacing(7)})`,
  },
}));

const CartContainer = styled(Paper)(({ theme }) => ({
  flex: { xs: 'none', md: 7 },
  height: { xs: '50%', md: '100%' },
  width: { xs: '100%', md: '58.3333%' },
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const PaymentContainer = styled(Paper)(({ theme }) => ({
  flex: { xs: 'none', md: 5 },
  height: { xs: '50%', md: '100%' },
  width: { xs: '100%', md: '41.6667%' },
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

const POS = ({ values }) => {

  const navigate = useNavigate();

  // State quản lý hóa đơn
  const [bills, setBills] = useState(() => {
    try {
      const saved = localStorage.getItem('pos-bills');
      return saved ? JSON.parse(saved) : [{
        id: 1,
        items: [],
        customerId: null,
        paymentMethod: 'cash',
        createdAt: new Date().toISOString(),
        status: 'pending'
      }];
    } catch (e) {
      console.error('Lỗi khi đọc localStorage pos-bills:', e);
      return [{
        id: 1,
        items: [],
        customerId: null,
        paymentMethod: 'cash',
        createdAt: new Date().toISOString(),
        status: 'pending'
      }];
    }
  });

  // State quản lý khách hàng
  const [customers, setCustomers] = useState(() => {
    try {
      const saved = localStorage.getItem('pos-customers');
      return saved ? JSON.parse(saved) : [
        { id: 1, name: 'Khách vãng lai', phone: '' },
        { id: 2, name: 'Nguyễn Văn A', phone: '0123456789' },
        { id: 3, name: 'Trần Thị B', phone: '0987654321' }
      ];
    } catch (e) {
      console.error('Lỗi khi đọc localStorage pos-customers:', e);
      return [
        { id: 1, name: 'Khách vãng lai', phone: '' },
        { id: 2, name: 'Nguyễn Văn A', phone: '0123456789' },
        { id: 3, name: 'Trần Thị B', phone: '0987654321' }
      ];
    }
  });

  // Phương thức thanh toán
  const paymentMethods = [
    { value: 'cash', label: 'Tiền mặt' },
    { value: 'card', label: 'Thẻ ngân hàng' },
    { value: 'mobile', label: 'Ứng dụng di động' }
  ];

  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [activeBill, setActiveBill] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [phoneSearch, setPhoneSearch] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const searchRef = useRef(null);

  // Danh sách sản phẩm mẫu
  const sampleProducts = [
    { id: 1, code: 'SP001', name: 'Áo thun trắng', price: 150000, stock: 10, category: 'Áo' },
    { id: 2, code: 'SP002', name: 'Quần jeans đen', price: 350000, stock: 100, category: 'Quần' },
    { id: 3, code: 'SP003', name: 'Giày sneakers', price: 500000, stock: 2000, category: 'Giày' },
    { id: 4, code: 'SP004', name: 'Túi xách da', price: 450000, stock: 1005, category: 'Phụ kiện' },
    { id: 5, code: 'SP005', name: 'Ví da bò', price: 250000, stock: 2005, category: 'Phụ kiện' },
    { id: 6, code: 'SP006', name: 'Mũ lưỡi trai', price: 120000, stock: 4000, category: 'Phụ kiện' },
    { id: 7, code: 'SP007', name: 'Áo khoác denim', price: 400000, stock: 1800, category: 'Áo' },
    { id: 8, code: 'SP008', name: 'Quần shorts', price: 200000, stock: 2002, category: 'Quần' },
    { id: 9, code: 'SP009', name: 'Dép quai ngang', price: 100000, stock: 3005, category: 'Giày' },
    { id: 10, code: 'SP010', name: 'Áo polo', price: 180000, stock: 2800, category: 'Áo' }
  ];

  // Hiển thị thông báo
  const showNotification = (message) => {
    setSnackMessage(message);
    setSnackOpen(true);
  };

  // Lưu dữ liệu vào localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pos-bills', JSON.stringify(bills));
    } catch (e) {
      console.error('Lỗi khi lưu pos-bills vào localStorage:', e);
    }
  }, [bills]);

  useEffect(() => {
    try {
      localStorage.setItem('pos-customers', JSON.stringify(customers));
    } catch (e) {
      console.error('Lỗi khi lưu pos-customers vào localStorage:', e);
    }
  }, [customers]);

  // Xử lý nhấn ra ngoài để đóng dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowCustomerDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Đồng bộ activeBill
  useEffect(() => {
    if (bills.length === 0) {
      setBills([{
        id: 1,
        items: [],
        customerId: null,
        paymentMethod: 'cash',
        createdAt: new Date().toISOString(),
        status: 'pending'
      }]);
      setActiveBill(0);
    } else if (activeBill >= bills.length) {
      setActiveBill(bills.length - 1);
    }
  }, [bills, activeBill]);

  // Lọc sản phẩm
  const filteredProducts = sampleProducts.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Lọc khách hàng theo số điện thoại
  const filteredCustomers = phoneSearch.trim() === ''
    ? []
    : customers.filter(c =>
      c.phone && c.phone.includes(phoneSearch.trim())
    );

  // Thêm sản phẩm vào hóa đơn
  const addToCart = (product) => {
    if (!product || !product.id || !product.name || !product.price || !product.stock) {
      showNotification('Sản phẩm không hợp lệ');
      return;
    }

    if (!bills[activeBill]) {
      showNotification('Hóa đơn không hợp lệ');
      return;
    }

    if (product.stock <= 0) {
      showNotification('Sản phẩm đã hết hàng');
      return;
    }

    setBills(prevBills => {
      const updatedBills = [...prevBills];
      const bill = { ...updatedBills[activeBill], items: [...updatedBills[activeBill].items] };
      const existingIndex = bill.items.findIndex(i => i.id === product.id);

      if (existingIndex !== -1) {
        const existingItem = { ...bill.items[existingIndex] };
        const newQuantity = existingItem.quantity + 1;
        if (newQuantity <= product.stock) {
          existingItem.quantity = newQuantity;
          bill.items[existingIndex] = existingItem;
        } else {
          showNotification('Không thể thêm sản phẩm, đã đạt giới hạn tồn kho');
          return prevBills;
        }
      } else {
        bill.items.unshift({ ...product, quantity: 1 });
      }

      updatedBills[activeBill] = bill;
      return updatedBills;
    });

    setSearchTerm('');
    showNotification(`Đã thêm ${product.name} vào hóa đơn`);
  };

  // Cập nhật số lượng sản phẩm
  const updateQuantity = (productId, newQty) => {
    if (newQty < 1) return;
    const product = sampleProducts.find(p => p.id === productId);
    if (!product || newQty > product.stock) {
      showNotification('Số lượng vượt quá tồn kho');
      return;
    }

    setBills(prevBills => {
      const updatedBills = [...prevBills];
      const bill = { ...updatedBills[activeBill], items: [...updatedBills[activeBill].items] };
      const itemIndex = bill.items.findIndex(i => i.id === productId);
      if (itemIndex !== -1) {
        bill.items[itemIndex] = { ...bill.items[itemIndex], quantity: newQty };
        updatedBills[activeBill] = bill;
        return updatedBills;
      }
      return prevBills;
    });
  };

  // Xóa sản phẩm khỏi giỏ
  const removeFromCart = (productId) => {
    setBills(prevBills => {
      const updatedBills = [...prevBills];
      const bill = { ...updatedBills[activeBill], items: updatedBills[activeBill].items.filter(i => i.id !== productId) };
      updatedBills[activeBill] = bill;
      return updatedBills;
    });
    showNotification('Đã xóa sản phẩm khỏi hóa đơn');
  };

  // Tạo hóa đơn mới
  const createNewBill = () => {
    const maxId = bills.reduce((max, bill) => Math.max(max, bill.id), 0);
    const newId = maxId + 1;

    const newBill = {
      id: newId,
      items: [],
      customerId: null,
      paymentMethod: 'cash',
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    setBills(prevBills => [...prevBills, newBill]);
    setActiveBill(bills.length);
    showNotification(`Đã tạo hóa đơn mới #${newId}`);
  };

  // Xóa hóa đơn
  const handleDeleteBill = (index) => {
    if (bills.length === 1) {
      const updatedBills = [{
        id: 1,
        items: [],
        customerId: null,
        paymentMethod: 'cash',
        createdAt: new Date().toISOString(),
        status: 'pending'
      }];
      setBills(updatedBills);
      setActiveBill(0);
      showNotification('Đã reset hóa đơn về trạng thái ban đầu');
    } else {
      const updatedBills = bills.filter((_, i) => i !== index);
      setBills(updatedBills);
      setActiveBill(Math.max(0, index - 1));
      showNotification(`Đã xóa hóa đơn #${bills[index].id}`);
    }
  };

  // Xử lý chọn khách hàng
  const handleSelectCustomer = (customer) => {
    setBills(prevBills => {
      const updatedBills = [...prevBills];
      updatedBills[activeBill] = {
        ...updatedBills[activeBill],
        customerId: customer.id
      };
      return updatedBills;
    });
    setPhoneSearch('');
    setShowCustomerDropdown(false);
    showNotification(`Đã chọn khách hàng: ${customer.name}`);
  };

  // Thêm khách hàng mới
  const handleAddNewCustomer = () => {
    if (!phoneSearch.trim()) {
      showNotification('Vui lòng nhập số điện thoại');
      return;
    }
    if (customers.some(c => c.phone === phoneSearch.trim())) {
      showNotification('Số điện thoại đã tồn tại');
      return;
    }
    const newCustomer = {
      id: customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1,
      name: '',
      phone: phoneSearch.trim(),
      createdAt: new Date().toISOString()
    };
    setCustomers([...customers, newCustomer]);
    handleSelectCustomer(newCustomer);
    showNotification('Đã thêm khách hàng mới');
  };

  // Xóa khách hàng khỏi hóa đơn
  const handleRemoveCustomer = () => {
    setBills(prevBills => {
      const updatedBills = [...prevBills];
      updatedBills[activeBill] = { ...updatedBills[activeBill], customerId: null };
      return updatedBills;
    });
    setPhoneSearch('');
    showNotification('Đã xóa khách hàng khỏi hóa đơn');
  };

  // Tính tổng tiền
  const calculateTotal = (items) => items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Xử lý thanh toán
  const handlePayment = () => {
    if (!bills[activeBill] || !bills[activeBill].items.length) {
      showNotification('Hóa đơn trống, không thể thanh toán');
      return;
    }

    const paidBillId = bills[activeBill].id;

    // Giảm số lượng tồn kho
    bills[activeBill].items.forEach(item => {
      const product = sampleProducts.find(p => p.id === item.id);
      if (product) {
        product.stock -= item.quantity;
      }
    });

    // Xóa hóa đơn đã thanh toán và cập nhật danh sách hóa đơn
    const updatedBills = bills.filter((_, index) => index !== activeBill);
    let newActiveBillIndex = 0;

    // Nếu không còn hóa đơn nào, tạo hóa đơn mới với trạng thái ban đầu
    if (updatedBills.length === 0) {
      updatedBills.push({
        id: 1,
        items: [],
        customerId: null,
        paymentMethod: 'cash',
        createdAt: new Date().toISOString(),
        status: 'pending'
      });
    } else {
      // Tìm hóa đơn chưa thanh toán tiếp theo
      const nextPendingBillIndex = updatedBills.findIndex(bill => bill.status === 'pending');
      newActiveBillIndex = nextPendingBillIndex !== -1 ? nextPendingBillIndex : 0;
    }

    setBills(updatedBills);
    setActiveBill(newActiveBillIndex);

    showNotification(`Thanh toán hóa đơn #${paidBillId} thành công`);
  };

  // Tìm khách hàng hiện tại
  const currentCustomer = bills[activeBill]?.customerId
    ? customers.find(c => c.id === bills[activeBill].customerId)
    : null;

  // Xử lý phương thức thanh toán
  const handlePaymentMethodChange = (event) => {
    const newMethod = event.target.value;
    setBills(prevBills => {
      const updatedBills = [...prevBills];
      updatedBills[activeBill] = { ...updatedBills[activeBill], paymentMethod: newMethod };
      return updatedBills;
    });
    showNotification(`Đã chọn phương thức thanh toán: ${paymentMethods.find(m => m.value === newMethod).label}`);
  };

  return (
    <Container maxWidth={false} sx={{ p: 0, m: 0, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <StyledPaper>
        <Box display="flex" alignItems="center" gap={2}>
          {/* Ô tìm kiếm sản phẩm */}
          <Box width={{ xs: '100%', sm: 300 }} ref={searchRef}>
            <Autocomplete
              options={filteredProducts}
              getOptionLabel={(option) => `${option.code} - ${option.name}`}
              onChange={(e, value) => value && addToCart(value)}
              onInputChange={(e, value) => setSearchTerm(value || '')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  placeholder="Nhập tên/mã sản phẩm..."
                  variant="outlined"
                  autoFocus
                />
              )}
              renderOption={(props, option) => (
                <li {...props} key={option.id}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" sx={{ px: 1, py: 0.5 }}>
                    <Box display="flex" alignItems="center">
                      <Chip label={`#${option.code}`} size="small" sx={{ mr: 1 }} />
                      <Typography>{option.name}</Typography>
                    </Box>
                    <Typography color="success.main" fontWeight="bold">
                      {option.price.toLocaleString()}₫
                    </Typography>
                  </Box>
                </li>
              )}
              sx={{ width: '100%' }}
              popupIcon={null}
              clearOnBlur
            />
          </Box>

          {/* Tabs hóa đơn */}
          <Tabs
            value={activeBill}
            onChange={(e, newValue) => setActiveBill(newValue)}
            sx={{ flexGrow: 1, mx: { xs: 1, sm: 2 } }}
            variant="scrollable"
            scrollButtons="auto"
          >
            {bills.map((bill, index) => (
              <Tab
                key={bill.id}
                label={
                  <Box display="flex" alignItems="center">
                    <Typography variant="body2">Hóa đơn #{bill.id}</Typography>
                    <Box
                      color="error.main"
                      ml={1}
                      sx={{ cursor: 'pointer' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteBill(index);
                      }}
                      role="button"
                      aria-label={`Xóa hóa đơn ${bill.id}`}
                    >
                      <Close fontSize="small" />
                    </Box>
                  </Box>
                }
              />
            ))}
          </Tabs>

          <Button variant="contained" onClick={createNewBill} title="Hóa đơn mới" size="small">
            <Add />
          </Button>
          <Button
            variant="outlined"
            onClick={() => {            
              navigate('/admin/dashboard');
            }}
            title="Trang chính"
            size="small"
          >
            <Home />
          </Button>
        </Box>
      </StyledPaper>

      {/* Main content */}
      <MainContent>
        {/* Cart */}
        <CartContainer elevation={1} className='cart-container'>
          {bills[activeBill]?.items.length > 0 ? (
            <TableContainer sx={{ maxHeight: '80%', overflowY: 'auto' }}>
              <Table stickyHeader>
                <TableHead sx={{ bgcolor: 'grey.200' }}>
                  <TableRow>
                    <TableCell>Sản phẩm</TableCell>
                    <TableCell align="center" sx={{ width: { xs: 100, md: 120 } }}>Số lượng</TableCell>
                    <TableCell align="right" sx={{ width: { xs: 80, md: 100 } }}>Đơn giá</TableCell>
                    <TableCell align="right" sx={{ width: { xs: 100, md: 120 } }}>Thành tiền</TableCell>
                    <TableCell sx={{ width: 50 }} />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bills[activeBill].items.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Chip label={`#${item.code}`} size="small" sx={{ mr: 1 }} />
                          <Box>
                            <Typography fontWeight="bold">{item.name}</Typography>
                            <Typography variant="body2" color="success.main">
                              {item.price.toLocaleString()}₫
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" justifyContent="center">
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={bills[activeBill].status === 'paid'}
                          >
                            <Remove />
                          </Button>
                          <TextField
                            size="small"
                            value={item.quantity}
                            onChange={e => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            sx={{ width: { xs: 50, md: 60 }, mx: 1 }}
                            inputProps={{ style: { textAlign: 'center' } }}
                            disabled={bills[activeBill].status === 'paid'}
                          />
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={bills[activeBill].status === 'paid'}
                          >
                            <Add />
                          </Button>
                        </Box>
                      </TableCell>
                      <TableCell align="right">{item.price.toLocaleString()}₫</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                        {(item.price * item.quantity).toLocaleString()}₫
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => removeFromCart(item.id)}
                          disabled={bills[activeBill].status === 'paid'}
                        >
                          <Delete fontSize="small" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%" color="text.secondary">
              <img
                src="/images/empty-cart.png"
                alt="Giỏ hàng trống"
                style={{ opacity: 0.25, marginBottom: 16, maxWidth: 100 }}
                onError={(e) => {
                  e.target.src = 'https://placehold.co/100x100?text=+';
                }}
              />
              <Typography>Chưa có sản phẩm trong hóa đơn</Typography>
            </Box>
          )}
        </CartContainer>

        {/* Payment summary */}
        <PaymentContainer elevation={1} className='payment-container'>
          <Typography variant="h6" mb={2}>Thông tin thanh toán</Typography>

          {/* Tìm kiếm khách hàng */}
          <Box mb={3} ref={searchRef}>
            <Typography variant="body2" mb={1}>Tìm khách hàng theo số điện thoại</Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Nhập số điện thoại..."
              value={phoneSearch}
              onChange={(e) => {
                setPhoneSearch(e.target.value);
                setShowCustomerDropdown(e.target.value.trim() !== '');
              }}
              onFocus={() => setShowCustomerDropdown(phoneSearch.trim() !== '')}
              variant="outlined"
              disabled={bills[activeBill].status === 'paid'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="text"
                      color="primary"
                      onClick={handleAddNewCustomer}
                      size="small"
                      disabled={bills[activeBill].status === 'paid'}
                    >
                      <Add />
                    </Button>
                  </InputAdornment>
                )
              }}
            />
            {showCustomerDropdown && (
              <Paper
                sx={{
                  position: 'absolute',
                  width: '100%',
                  maxWidth: 344,
                  maxHeight: 200,
                  overflowY: 'auto',
                  zIndex: 1000,
                  mt: 1,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  borderRadius: 1
                }}
              >
                {filteredCustomers.length > 0 ? (
                  <List>
                    {filteredCustomers.map(customer => (
                      <ListItem
                        key={customer.id}
                        onClick={() => handleSelectCustomer(customer)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <ListItemText primary={customer.phone} />
                        <Typography variant="body2" color="text.secondary">
                          {customer.name || 'Chưa có tên'}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Box p={2} textAlign="center" color="text.secondary">
                    Không tìm thấy khách hàng
                  </Box>
                )}
              </Paper>
            )}
          </Box>

          {/* Hiển thị khách hàng đã chọn */}
          {currentCustomer && (
            <Paper elevation={1} sx={{ mb: 2, p: 2, bgcolor: 'grey.50' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">
                  {currentCustomer.name || 'Khách vãng lai'} - {currentCustomer.phone || ''}
                </Typography>
                <Button
                  variant="text"
                  color="error"
                  onClick={handleRemoveCustomer}
                  size="small"
                  disabled={bills[activeBill].status === 'paid'}
                >
                  <Close />
                </Button>
              </Box>
            </Paper>
          )}

          {/* Tóm tắt thanh toán */}
          <TableContainer sx={{ flexGrow: 1, height: 170, maxHeight: 170 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Tạm tính:</TableCell>
                  <TableCell align="right">{calculateTotal(bills[activeBill]?.items || []).toLocaleString()}₫</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>VAT (8%):</TableCell>
                  <TableCell align="right">{(calculateTotal(bills[activeBill]?.items || []) * 0.1).toLocaleString()}₫</TableCell>
                </TableRow>
                <TableRow sx={{ borderTop: '1px solid', borderColor: 'grey.300' }}>
                  <TableCell sx={{ pt: 1, fontWeight: 'bold' }}>Tổng cộng:</TableCell>
                  <TableCell align="right" sx={{ pt: 1, fontWeight: 'bold', color: 'success.main' }}>
                    {(calculateTotal(bills[activeBill]?.items || []) * 1.1).toLocaleString()}₫
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Phương thức thanh toán */}
          <Box mb={3.3}>
            <Typography variant="body2" mb={1.1} sx={{ fontSize: '0.9rem' }}>Phương thức thanh toán</Typography>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontSize: '1rem' }}>Chọn phương thức</InputLabel>
              <Select
                value={bills[activeBill]?.paymentMethod || 'cash'}
                onChange={handlePaymentMethodChange}
                disabled={bills[activeBill]?.status === 'paid'}
              >
                {paymentMethods.map(method => (
                  <MenuItem key={method.value} value={method.value}>
                    {method.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Button
            variant="contained"
            color="success"
            fullWidth
            size="large"
            onClick={handlePayment}
            sx={{ mt: 2 }}
            disabled={bills[activeBill].status === 'paid'}
          >
            {bills[activeBill].status === 'paid' ? 'Đã thanh toán' : 'Xác nhận thanh toán'}
          </Button>
        </PaymentContainer>
      </MainContent>

      {/* Thông báo */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackOpen(false)} severity="info" sx={{ width: '100%' }}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default POS;