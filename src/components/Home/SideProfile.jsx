import { useAuth } from "@contexts/AuthContext";
import { Link } from "react-router-dom";

export default function ProfileSidebar() {
  
  const {  logoutCustomer  } = useAuth();

  return (
    <div className="col-md-3 profile-sidebar">
      
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
            <button
              onClick={logoutCustomer}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                margin: 0,
                color: "inherit",
                cursor: "pointer",
                fontSize: "inherit",
                fontFamily: "inherit",
                textAlign: "left",
              }}
            >
              Đăng xuất
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
