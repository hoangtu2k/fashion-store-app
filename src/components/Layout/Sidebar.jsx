import React ,{ useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronDown, ChevronRight, HouseDoor, People, Box, Cart, GraphUp, Gear, Cash } from 'react-bootstrap-icons'

export default function Sidebar({ collapsed, toggleSidebar }) {
  const [ordersDropdownOpen, setOrdersDropdownOpen] = useState(false)
  const [reportsDropdownOpen, setReportsDropdownOpen] = useState(false)

  const toggleOrdersDropdown = () => {
    setOrdersDropdownOpen(!ordersDropdownOpen)
  }

  const toggleReportsDropdown = () => {
    setReportsDropdownOpen(!reportsDropdownOpen)
  }

  return (
    <div className={`d-flex flex-column flex-shrink-0 bg-dark text-white ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
      <div className="p-3 d-flex justify-content-between align-items-center border-bottom">
        {!collapsed && <h4 className="m-0">Fashion Store Admin</h4>}
        <button className="btn btn-outline-light btn-sm" onClick={toggleSidebar}>
          {collapsed ? '>' : <i className="bi bi-x-lg"></i>}
        </button>
      </div>
      
      <ul className="nav nav-pills flex-column mb-auto px-2">
        {/* Dashboard Menu Item */}
        <li className="nav-item">
          <NavLink 
            to="/admin/dashboard" 
            className={({ isActive }) => 
              `nav-link text-white ${isActive ? 'active' : ''}`
            }
          >
            <HouseDoor className="me-3" />
            {!collapsed && <span>Dashboard</span>}
          </NavLink>
        </li>

        {/* Customers Menu Item */}
        <li className="nav-item">
          <NavLink 
            to="/admin/customers" 
            className={({ isActive }) => 
              `nav-link text-white ${isActive ? 'active' : ''}`
            }
          >
            <People className="me-3" />
            {!collapsed && <span>Customers</span>}
          </NavLink>
        </li>

        {/* Products Menu Item */}
        <li className="nav-item">
          <NavLink 
            to="/admin/products" 
            className={({ isActive }) => 
              `nav-link text-white ${isActive ? 'active' : ''}`
            }
          >
            <Box className="me-3" />
            {!collapsed && <span>Products</span>}
          </NavLink>
        </li>

        {/* Orders Dropdown Menu */}
        <li className="nav-item">
          <div 
            className="nav-link text-white d-flex justify-content-between align-items-center cursor-pointer"
            onClick={toggleOrdersDropdown}
          >
            <div>
              <Cart className="me-3" />
              {!collapsed && <span>Orders</span>}
            </div>
            {!collapsed && (
              ordersDropdownOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
            )}
          </div>
          
          {!collapsed && ordersDropdownOpen && (
            <ul className="nav flex-column ps-5">
              <li className="nav-item">
                <NavLink 
                  to="/admin/orders/list" 
                  className={({ isActive }) => 
                    `nav-link text-white ${isActive ? 'active' : ''}`
                  }
                >
                  <i className="bi bi-list-ul me-2"></i>
                  Order List
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/admin/orders/create" 
                  className={({ isActive }) => 
                    `nav-link text-white ${isActive ? 'active' : ''}`
                  }
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Create New Order
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Reports Dropdown Menu */}
        <li className="nav-item">
          <div 
            className="nav-link text-white d-flex justify-content-between align-items-center cursor-pointer"
            onClick={toggleReportsDropdown}
          >
            <div>
              <GraphUp className="me-3" />
              {!collapsed && <span>Reports</span>}
            </div>
            {!collapsed && (
              reportsDropdownOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
            )}
          </div>
          
          {!collapsed && reportsDropdownOpen && (
            <ul className="nav flex-column ps-5">
              <li className="nav-item">
                <NavLink 
                  to="/admin/reports/sales" 
                  className={({ isActive }) => 
                    `nav-link text-white ${isActive ? 'active' : ''}`
                  }
                >
                  <i className="bi bi-currency-dollar me-2"></i>
                  Sales Reports
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/admin/reports/inventory" 
                  className={({ isActive }) => 
                    `nav-link text-white ${isActive ? 'active' : ''}`
                  }
                >
                  <i className="bi bi-box-seam me-2"></i>
                  Inventory Reports
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* POS - Bán hàng trực tiếp */}
        <li className="nav-item">
          <NavLink 
            to="/pos" 
            className="nav-link text-white d-flex align-items-center"
          >
            <Cash className={collapsed ? "mx-auto" : "me-3"} />
            {!collapsed && <span>Bán hàng trực tiếp</span>}
          </NavLink>
        </li>

        {/* Settings Menu Item */}
        <li className="nav-item">
          <NavLink 
            to="/admin/settings" 
            className={({ isActive }) => 
              `nav-link text-white ${isActive ? 'active' : ''}`
            }
          >
            <Gear className="me-3" />
            {!collapsed && <span>Settings</span>}
          </NavLink>
        </li>
      </ul>

      {/* User Profile Section */}
      <div className="p-3 border-top border-secondary">
        <div className="d-flex align-items-center">
          <img 
            src="" 
            className="rounded-circle me-2" 
            alt="User"
            width="40"
            height="40"
          />
          {!collapsed && (
            <div>
              <div className="text-white">Admin User</div>
              <small className="text-muted">admin@example.com</small>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
