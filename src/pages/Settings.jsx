import { Tab, Tabs, Form, Button } from 'react-bootstrap'

export default function Settings() {
  return (
    <div>
      <h4 className="mb-4">System Settings</h4>
      
      <Tabs defaultActiveKey="general" className="mb-3">
        <Tab eventKey="general" title="General">
          <div className="card border-0 shadow-sm mt-3">
            <div className="card-body">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Store Name</Form.Label>
                  <Form.Control type="text" defaultValue="Fashion Store" />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Store Email</Form.Label>
                  <Form.Control type="email" defaultValue="contact@fashion-store.com" />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Store Address</Form.Label>
                  <Form.Control as="textarea" rows={3} defaultValue="123 Fashion Street, District 1, HCMC" />
                </Form.Group>
                
                <Button variant="primary" type="submit">Save Changes</Button>
              </Form>
            </div>
          </div>
        </Tab>
        
        <Tab eventKey="payment" title="Payment">
          <div className="card border-0 shadow-sm mt-3">
            <div className="card-body">
              <h5 className="mb-4">Payment Methods</h5>
              
              <Form>
                <Form.Check 
                  type="switch"
                  id="cod-switch"
                  label="Cash on Delivery (COD)"
                  defaultChecked
                  className="mb-3"
                />
                
                <Form.Check 
                  type="switch"
                  id="bank-switch"
                  label="Bank Transfer"
                  defaultChecked
                  className="mb-3"
                />
                
                <Form.Check 
                  type="switch"
                  id="momo-switch"
                  label="Momo Payment"
                  className="mb-3"
                />
                
                <Button variant="primary" type="submit">Update Payment Methods</Button>
              </Form>
            </div>
          </div>
        </Tab>
        
        <Tab eventKey="shipping" title="Shipping">
          <div className="card border-0 shadow-sm mt-3">
            <div className="card-body">
              <h5 className="mb-4">Shipping Settings</h5>
              
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Shipping Fee (VND)</Form.Label>
                  <Form.Control type="number" defaultValue="20000" />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Free Shipping Minimum (VND)</Form.Label>
                  <Form.Control type="number" defaultValue="500000" />
                </Form.Group>
                
                <Button variant="primary" type="submit">Update Shipping Settings</Button>
              </Form>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}
