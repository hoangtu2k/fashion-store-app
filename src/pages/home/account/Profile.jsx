import ProfileSidebar from "@components/Home/SideProfile";
import { Avatar, TextField, Button, Typography } from "@mui/material";
import "@style/profile.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Profile() {
  const [customerUser, setCustomerUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lấy user từ localStorage khi component load
    const storedCustomer = localStorage.getItem("customerUser");
    if (storedCustomer) {
      try {
        const parsedUser = JSON.parse(storedCustomer);
        setCustomerUser(parsedUser);
      } catch (error) {
        console.error("Error parsing customerUser from localStorage:", error);
        setCustomerUser(null);
      }
    }
    setLoading(false); // Set loading to false after attempting to load
  }, []);

  // Hiển thị loading state hoặc dữ liệu
  if (loading) {
    return <Typography>Loading...</Typography>; // Optional loading state
  }

  return (
    <div className="container profile-container">
      <div className="row">
        {/* Menu bên trái */}
        <ProfileSidebar />

        {/* Nội dung bên phải */}
        <div className="col-md-9">
          {/* Nội dung mock */}
          <div className="profile-content">
            {/* TÀI KHOẢN ĐĂNG NHẬP Section */}
            <div className="profile-section login-account-section">
              <Typography variant="h6" gutterBottom>
                TÀI KHOẢN ĐĂNG NHẬP
              </Typography>
              <hr />
              <div className="label-value-pair">
                <span className="label">Tên đăng nhập</span>
                <span className="value">{customerUser?.username}</span>
              </div>
              <div className="label-value-pair">
                <span className="label">Đổi mật khẩu</span>
                <Button className="btn-dmk" variant="outlined" size="small">
                  Đổi mật khẩu
                </Button>
              </div>
              <hr />
            </div>

            {/* TÀI KHOẢN Section */}
            <div className="profile-section account-section">
              <Typography variant="h6" gutterBottom>
                TÀI KHOẢN
              </Typography>
              <hr />
              <div className="label-value-pair">
                <span className="label">Email</span>
                <span className="value">{customerUser?.email}</span>
              </div>
              <div className="label-value-pair">
                <span className="label">Tên</span>
                <span className="value">{customerUser?.fullName}</span>
              </div>
              <div className="label-value-pair">
                <span className="label">Ngày sinh</span>
                <span className="value">{customerUser?.dob}</span>
              </div>
              <div className="label-value-pair">
                <span className="label">Giới tính</span>
                <span className="value">{customerUser?.gender}</span>
              </div>
              <div className="label-value-pair">
                <span className="label">Số điện thoại</span>
                <span className="value">{customerUser?.phone}</span>
              </div>
              <Button className="btn-info" variant="contained" color="primary">
                Cập nhật thông tin
              </Button>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}