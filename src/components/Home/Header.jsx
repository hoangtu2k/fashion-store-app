import { useState, useEffect } from "react";
import { Favorite, Person, Search, ShoppingBagRounded } from "@mui/icons-material";
import { AppBar, Badge, Button, Stack, Toolbar, Typography, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header({ cartCount }) {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    // Lấy user từ localStorage khi component load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <header>
      <AppBar position="fixed" className="navbar-custom">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Logo + Menu bên trái */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography
              variant="h6"
              component={Link}
              to="/"
              className="logo-text"
              sx={{ textDecoration: "none" }}
            >
              MLB
            </Typography>

            {/* QUẦN ÁO + dropdown */}
            <Button color="inherit" className="nav-link" onMouseEnter={handleMenuOpen}>
              Quần
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              MenuListProps={{ onMouseLeave: handleMenuClose }}
              disableScrollLock
            >
              <MenuItem component={Link} to="/quan-ao/quan-jeans" onClick={handleMenuClose}>
                Quần jeans
              </MenuItem>
              <MenuItem component={Link} to="/quan-ao/quan-short" onClick={handleMenuClose}>
                Quần short
              </MenuItem>
            </Menu>

            <Button color="inherit" component={Link} to="/phu-kien" className="nav-link">
              Áo
            </Button>
            <Button color="inherit" component={Link} to="/uu-dai" className="nav-link">
              ƯU ĐÃI
            </Button>
          </Stack>

          {/* Icons bên phải */}
          <Stack direction="row" spacing={1} className="header-icons">
            <Button color="inherit" component={Link} to="/search">
              <Search className="header-icon" />
            </Button>
            <Button color="inherit" component={Link} to="/cart">
              <Badge
                badgeContent={cartCount}
                color="error"
                sx={{ "& .MuiBadge-badge": { fontSize: 10, height: 16, minWidth: 16 } }}
              >
                <ShoppingBagRounded className="header-icon" />
              </Badge>
            </Button>
            <Button color="inherit" component={Link} to="/wishlist">
              <Favorite className="header-icon" />
            </Button>
            <Button
              color="inherit"
              component={Link}
              to={user ? "/account" : "/account/login"}
              title={user ? "Hồ sơ cá nhân" : "Đăng nhập"}
            >
              <span style={{ color: "black", marginRight: 4 }}>{user ? user.name : "Đăng nhập"}</span>
              <Person className="header-icon" />
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </header>
  );
}
