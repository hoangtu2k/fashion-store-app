import { Table, Badge, Dropdown } from 'react-bootstrap'

export default function Orders() {
  const orders = [
    { id: 'ORD-1001', customer: 'Nguyễn Văn A', date: '2023-08-15', amount: 750000, status: 'completed' },
    { id: 'ORD-1002', customer: 'Trần Thị B', date: '2023-08-14', amount: 1200000, status: 'processing' },
    { id: 'ORD-1003', customer: 'Lê Văn C', date: '2023-08-13', amount: 500000, status: 'pending' },
    { id: 'ORD-1004', customer: 'Phạm Thị D', date: '2023-08-12', amount: 350000, status: 'cancelled' }
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed': return <Badge bg="success">Completed</Badge>
      case 'processing': return <Badge bg="primary">Processing</Badge>
      case 'pending': return <Badge bg="warning" text="dark">Pending</Badge>
      case 'cancelled': return <Badge bg="danger">Cancelled</Badge>
      default: return <Badge bg="secondary">Unknown</Badge>
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Order Management</h4>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" id="dropdown-filter">
            <i className="bi bi-filter"></i> Filter Orders
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>All Orders</Dropdown.Item>
            <Dropdown.Item>Completed</Dropdown.Item>
            <Dropdown.Item>Processing</Dropdown.Item>
            <Dropdown.Item>Pending</Dropdown.Item>
            <Dropdown.Item>Cancelled</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.date}</td>
              <td>{order.amount.toLocaleString()} VND</td>
              <td>{getStatusBadge(order.status)}</td>
              <td>
                <button className="btn btn-sm btn-outline-primary me-2">
                  <i className="bi bi-eye"></i> View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
