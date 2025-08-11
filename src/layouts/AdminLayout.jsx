import Sidebar from '@components/Layout/Sidebar';
import Navbar from '@components/Layout/Navbar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

export default function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="d-flex vh-100 bg-light">
      <Sidebar
        collapsed={sidebarCollapsed}
        toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-grow-1 overflow-auto d-flex flex-column">
        <Navbar toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className="flex-grow-1 p-4">
          <Outlet /> {/* Render page con */}
        </main>
      </div>
    </div>
  );
}
