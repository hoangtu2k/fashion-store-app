import { useState } from 'react'
import { Button, Table, Form, Modal } from 'react-bootstrap'

export default function Products() {
  const [showModal, setShowModal] = useState(false)
  const [products, setProducts] = useState([
    { id: 1, name: 'Áo thun trắng', category: 'Áo', price: 150000, stock: 50 },
    { id: 2, name: 'Quần jeans đen', category: 'Quần', price: 350000, stock: 30 },
    { id: 3, name: 'Giày thể thao', category: 'Giày', price: 500000, stock: 20 }
  ])

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Product Management</h4>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          <i className="bi bi-plus"></i> Add Product
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price.toLocaleString()} VND</td>
              <td>{product.stock}</td>
              <td>
                <Button variant="info" size="sm" className="me-2">
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button variant="danger" size="sm">
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Product Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" placeholder="Enter product name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select>
                <option>Áo</option>
                <option>Quần</option>
                <option>Giày</option>
                <option>Phụ kiện</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Enter price" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock Quantity</Form.Label>
              <Form.Control type="number" placeholder="Enter stock quantity" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Save Product
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
