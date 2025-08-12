import { useState } from 'react'
import { Form, Button, Card, Row, Col, Table } from 'react-bootstrap'
import { Plus, Trash } from 'react-bootstrap-icons'

export default function CreateOrder() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Áo thun trắng', price: 150000, quantity: 1 },
    { id: 2, name: 'Quần jeans đen', price: 350000, quantity: 1 }
  ])
  const [selectedProduct, setSelectedProduct] = useState('')
  const [customer, setCustomer] = useState('')

  const addProduct = () => {
    if (selectedProduct) {
      const productToAdd = sampleProducts.find(p => p.id === parseInt(selectedProduct))
      setProducts([...products, { ...productToAdd, quantity: 1 }])
    }
  }

  const removeProduct = (id) => {
    setProducts(products.filter(p => p.id !== id))
  }

  const updateQuantity = (id, quantity) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, quantity: parseInt(quantity) } : p
    ))
  }

  const sampleProducts = [
    { id: 1, name: 'Áo thun trắng', price: 150000 },
    { id: 2, name: 'Quần jeans đen', price: 350000 },
    { id: 3, name: 'Giày thể thao', price: 500000 },
    { id: 4, name: 'Ví da', price: 200000 }
  ]

  const totalAmount = products.reduce((sum, product) => sum + (product.price * product.quantity), 0)

  return (
    <div>
      <h4 className="mb-4">Create New Order</h4>
      
      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-4">Customer Information</h5>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Customer</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search customer..."
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-4">Order Items</h5>
          <Row className="mb-3">
            <Col md={8}>
              <Form.Select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <option value="">Select a product</option>
                {sampleProducts.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} - {product.price.toLocaleString()} VND
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={4}>
              <Button variant="primary" onClick={addProduct}>
                <Plus className="me-1" /> Add Product
              </Button>
            </Col>
          </Row>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price.toLocaleString()} VND</td>
                  <td>
                    <Form.Control
                      type="number"
                      min="1"
                      value={product.quantity}
                      onChange={(e) => updateQuantity(product.id, e.target.value)}
                      style={{ width: '70px' }}
                    />
                  </td>
                  <td>{(product.price * product.quantity).toLocaleString()} VND</td>
                  <td>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => removeProduct(product.id)}
                    >
                      <Trash size={14} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Row>
            <Col md={{ span: 4, offset: 8 }}>
              <Table borderless>
                <tbody>
                  <tr>
                    <td><strong>Subtotal:</strong></td>
                    <td className="text-end">{totalAmount.toLocaleString()} VND</td>
                  </tr>
                  <tr>
                    <td><strong>Shipping:</strong></td>
                    <td className="text-end">20,000 VND</td>
                  </tr>
                  <tr>
                    <td><strong>Total:</strong></td>
                    <td className="text-end">{(totalAmount + 20000).toLocaleString()} VND</td>
                  </tr>
                </tbody>
              </Table>
              <div className="d-grid gap-2">
                <Button variant="success" size="lg">
                  Create Order
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  )
}
