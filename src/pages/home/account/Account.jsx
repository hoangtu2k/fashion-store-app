import { Avatar } from "@mui/material";
import '@style/profile.css';
import { Link } from "react-router-dom";

export default function Account() {
  const user = {
    name: "Hoàng Tú",
    avatar: "",
  };

  return (
    <div className="container profile-container">
      <div className="row">
        {/* Menu bên trái */}
        <div className="col-md-3 profile-sidebar">
          <h4 className="fw-bold mb-4">Tài khoản</h4>

          <div className="profile-section">
            <h6 className="profile-section-title">Thông tin mua hàng</h6>
            <ul className="profile-menu">
              <li>Thông tin hạng thành viên</li>
              <li>Thông tin đơn hàng</li>
            </ul>
          </div>

          <div className="profile-section">
            <h6 className="profile-section-title">Cài đặt tài khoản</h6>
            <ul className="profile-menu">
              <li>
                <Link to="/account/address">Địa chỉ giao hàng</Link>
              </li>
              <li>
                <Link to="/account/info">Thông tin của tôi</Link>
              </li>
              <li>
                <Link to="/account/delete">Xoá tài khoản</Link>
              </li>
              <li>
                <Link to="/logout">Đăng xuất</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Nội dung bên phải */}
        <div className="col-md-9">
          {/* Banner */}
          <div className="profile-banner">
            <Avatar
              sx={{
                bgcolor: "#ffffff33",
                width: 64,
                height: 64,
                fontSize: "1.5rem",
                marginRight: "15px",
                border: "2px solid white",
              }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <h5 className="mb-0">{user.name}</h5>
          </div>

          {/* Nội dung mock */}
          <div className="profile-content">
            <div className="profile-empty-icon">💬</div>
            <p>Không có lịch sử đặt hàng trong 3 tháng gần nhất.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
