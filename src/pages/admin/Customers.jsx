import { Table, Pagination } from 'react-bootstrap'

export default function Customers() {
  const customers = [
    { id: 1, name: 'Nguyễn Văn A', email: 'a.nguyen@example.com', phone: '0912345678', orders: 5, joined: '2023-01-15' },
    { id: 2, name: 'Trần Thị B', email: 'b.tran@example.com', phone: '0923456789', orders: 12, joined: '2022-11-22' },
    { id: 3, name: 'Lê Văn C', email: 'c.le@example.com', phone: '0934567890', orders: 3, joined: '2023-05-10' },
    { id: 4, name: 'Phạm Thị D', email: 'd.pham@example.com', phone: '0945678901', orders: 8, joined: '2023-03-18' }
  ]

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Customer Management</h4>
        <div className="d-flex">
          <input 
            type="text" 
            className="form-control me-2" 
            placeholder="Search customers..." 
            style={{ width: '300px' }}
          />
          <button className="btn btn-primary">
            <i className="bi bi-funnel"></i> Filter
          </button>
        </div>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Total Orders</th>
            <th>Joined Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.orders}</td>
              <td>{customer.joined}</td>
              <td>
                <button className="btn btn-sm btn-outline-primary me-2">
                  <i className="bi bi-eye"></i>
                </button>
                <button className="btn btn-sm btn-outline-success">
                  <i className="bi bi-pencil"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
    </div>
  )
}
