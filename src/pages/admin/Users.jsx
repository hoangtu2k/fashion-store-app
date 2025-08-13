import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedRoleIds, setSelectedRoleIds] = useState([]);

  // Load danh sách user và roles khi component mount
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

  // Mở modal phân quyền và load roles của user đó
  const openAssignModal = (user) => {
    setSelectedUserId(user.id);
    // Nếu API user list đã có roles, dùng luôn
    if (user.roles && user.roles.length > 0) {
      setSelectedRoleIds(user.roles.map(r => r.id));
      setShowAssignModal(true);
    } else {
      // Nếu không có roles kèm theo user, fetch riêng
      axios.get(`/api/admin/users/${user.id}`)
        .then(res => {
          setSelectedRoleIds(res.data.roles ? res.data.roles.map(r => r.id) : []);
          setShowAssignModal(true);
        })
        .catch(() => {
          setSelectedRoleIds([]);
          setShowAssignModal(true);
        });
    }
  };

  const closeAssignModal = () => {
    setShowAssignModal(false);
    setSelectedUserId(null);
    setSelectedRoleIds([]);
  };

  // Thêm/xóa role khi checkbox được click
  const toggleRole = (roleId) => {
    setSelectedRoleIds(prev => 
      prev.includes(roleId) 
        ? prev.filter(id => id !== roleId) 
        : [...prev, roleId]
    );
  };

  // Gửi danh sách roleId đã chọn lên backend
  const saveRoles = () => {
    axios.put(`/api/admin/users/${selectedUserId}/roles`, selectedRoleIds)
      .then(() => {
        alert("Cập nhật quyền thành công");
        fetchUsers(); // reload user list để cập nhật roles
        closeAssignModal();
      })
      .catch(() => alert("Lỗi khi cập nhật quyền"));
  };

  return (
    <div className="container mt-4">
      <h4>User Management</h4>

      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>STT</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Joined Date</th>
            <th>Roles</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user.id}>
              <td>{idx + 1}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : ""}</td>
              <td>
                {(user.roles || []).map(r => r.name).join(", ")}
              </td>
              <td>
                <button 
                  className="btn btn-sm btn-outline-warning" 
                  onClick={() => openAssignModal(user)}
                >
                  <i className="bi bi-shield-lock"></i> Phân quyền
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal phân quyền */}
      <Modal show={showAssignModal} onHide={closeAssignModal}>
        <Modal.Header closeButton>
          <Modal.Title>Phân quyền nhân viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeAssignModal}>Hủy</Button>
          <Button variant="primary" onClick={saveRoles}>Lưu</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
