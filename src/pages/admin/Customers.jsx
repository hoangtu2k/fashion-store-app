import { useEffect, useState } from 'react'
import { Table, Pagination } from 'react-bootstrap'
import axios from 'axios'

export default function Customers() {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    axios.get('/api/admin/customers')
      .then(res => {
        console.log('API customers:', res.data)
        setCustomers(res.data)
      })
      .catch(err => console.error(err))
  }, [])


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
            <th>STT</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Joined Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.fullName}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
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
    </div>
  )
}
