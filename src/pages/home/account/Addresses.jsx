import ProfileSidebar from "@components/Home/SideProfile";
import { Avatar, Button, Typography } from "@mui/material";
import "@style/profile.css";
import { Link } from "react-router-dom";

export default function Address() {
  const user = {
    name: "Hoàng Tú",
    address: "Số 2, ngách 105/47 Hồ Tùng Mậu, Mai Dịch, Cầu Giấy, Vietnam",
    phone: "0123456789",
    avatar: "",
  };

  return (
    <div className="container profile-container">
      <div className="row">
        {/* Menu bên trái */}
        <ProfileSidebar />

        {/* Nội dung bên phải */}
        <div className="col-md-9">
          {/* Nội dung mock */}
          <div className="profile-content">
            <div className="profile-section">
              <Typography variant="h6" gutterBottom>
                ĐỊA CHỈ
              </Typography>
              <hr />
              <div className="label-value-pair">
                <span className="label">Họ tên</span>
                <span className="value">{user.name}</span>
              </div>
              <div className="label-value-pair">
                <span className="label">Địa chỉ</span>
                <span className="value">{user.address}</span>
              </div>
              <div className="label-value-pair">
                <span className="label">Số điện thoại</span>
                <span className="value">{user.phone}</span>
              </div>
              <div className="label-value-pair">
                <span className="label"></span> {/* Empty label for alignment */}
                <Button variant="contained" color="primary">
                  Cập nhật
                </Button>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}