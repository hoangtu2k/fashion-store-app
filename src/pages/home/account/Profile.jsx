import ProfileSidebar from "@components/Home/SideProfile";
import { Avatar } from "@mui/material";
import '@style/profile.css';
import { Link } from "react-router-dom";

export default function Profile() {
  const user = {
    name: "Hoàng Tú",
    avatar: "",
  };

  return (
    <div className="container profile-container">
      <div className="row">
        {/* Menu bên trái */}
        <ProfileSidebar />

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
