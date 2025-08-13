import React, { useEffect, useState } from 'react';
import { Form, Dropdown, Button } from 'react-bootstrap';
import { Bell, Search } from 'react-bootstrap-icons';
import { useAuth } from '@contexts/AuthContext';
import axios from 'axios';

export default function Navbar({ toggleSidebar }) {
  const { adminUser, logoutAdmin , token } = useAuth();
  const [fullName, setFullName] = useState(adminUser?.fullName || '');

  // Lấy thông tin user từ backend nếu chưa có
  useEffect(() => {
    if (!fullName && token) {
      axios.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          setFullName(res.data.fullName); // lấy fullname từ backend
        })
        .catch(err => console.error(err));
    }
  }, [fullName, token]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container-fluid">
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleSidebar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <Form className="d-flex ms-3" style={{ width: '300px' }}>
          <Form.Control
            type="search"
            placeholder="Search..."
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">
            <Search />
          </Button>
        </Form>
        
        <div className="ms-auto d-flex align-items-center">
          {/* Notifications */}
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-notifications">
              <Bell size={20} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <Dropdown.Header>Notifications</Dropdown.Header>
              <Dropdown.Item>New order received</Dropdown.Item>
              <Dropdown.Item>Customer registration</Dropdown.Item>
              <Dropdown.Item>New message</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
          {/* User menu */}
          <Dropdown className="ms-3">
            <Dropdown.Toggle variant="light" id="dropdown-user">
              <img 
                src="https://placehold.co/30x30?text=+" 
                className="rounded-circle me-2" 
                alt="User"
                width="30"
                height="30"
              />
              {fullName || 'Loading...'}
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={logoutAdmin}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
}
