import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRoleIds, setSelectedRoleIds] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = () => {
    axios.get("/api/admin/users")
      .then(res => setUsers(res.data))
      .catch(console.error);
  };

  const fetchRoles = () => {
    axios.get("/api/admin/roles")
      .then(res => setRoles(res.data))
      .catch(console.error);
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setSelectedRoleIds(user.roles ? user.roles.map(r => r.id) : []);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setSelectedRoleIds([]);
  };

  const toggleRole = (roleId) => {
    setSelectedRoleIds(prev =>
      prev.includes(roleId)
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };

  const handleChange = (e) => {
    setSelectedUser({
      ...selectedUser,
      [e.target.name]: e.target.value,
    });
  };

  const saveUser = () => {
    const payload = {
      fullName: selectedUser.fullName,
      email: selectedUser.email,
      phone: selectedUser.phone,
      username: selectedUser.username,
      code: selectedUser.code,
      status: selectedUser.status,
      password: selectedUser.password, // Nếu để trống backend không đổi mật khẩu
      roleIds: selectedRoleIds,
    };

    axios.put(`/api/admin/users/${selectedUser.id}`, payload)
      .then(() => {
        alert("Cập nhật thành công");
        fetchUsers();
        closeModal();
      })
      .catch(() => alert("Lỗi khi cập nhật"));
  };

  // Hàm xóa user
  const deleteUser = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa user này?")) {
      axios.put(`/api/admin/users/status/${id}`)
        .then(() => {
          alert("Xóa user thành công");
          fetchUsers();
        })
        .catch(() => alert("Lỗi khi xóa user"));
    }
  };


  return (
    <div>
      <h4>Quản lý User</h4>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>STT</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Điện thoại</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => openModal(user)}
                >
                  Sửa & Phân quyền
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => deleteUser(user.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa User & Phân quyền</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Code</Form.Label>
                <Form.Control
                  name="code"
                  value={selectedUser.code || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Họ tên</Form.Label>
                <Form.Control
                  name="fullName"
                  value={selectedUser.fullName || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  value={selectedUser.email || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Điện thoại</Form.Label>
                <Form.Control
                  name="phone"
                  value={selectedUser.phone || ""}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Label>Phân quyền</Form.Label>
              {roles.map(role => (
                <Form.Check
                  key={role.id}
                  type="checkbox"
                  id={`role-${role.id}`}
                  label={role.name}
                  checked={selectedRoleIds.includes(role.id)}
                  onChange={() => toggleRole(role.id)}
                />
              ))}
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Hủy</Button>
          <Button variant="primary" onClick={saveUser}>Lưu</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
