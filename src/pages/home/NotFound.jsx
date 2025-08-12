// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.title}>404</h1>
        <p style={styles.message}>Oops! Trang bạn tìm kiếm không tồn tại.</p>
        <Link to="/" style={styles.button}>
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "0 20px",
  },
  box: {
    textAlign: "center",
    maxWidth: 400,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 40,
    borderRadius: 12,
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  },
  title: {
    fontSize: "8rem",
    margin: 0,
    fontWeight: "bold",
  },
  message: {
    fontSize: "1.5rem",
    margin: "20px 0 40px 0",
  },
  button: {
    padding: "12px 30px",
    borderRadius: 30,
    backgroundColor: "#fff",
    color: "#764ba2",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "1rem",
    boxShadow: "0 4px 15px rgba(255, 255, 255, 0.3)",
    transition: "background-color 0.3s ease",
  },
};
