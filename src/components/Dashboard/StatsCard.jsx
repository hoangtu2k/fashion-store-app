import { Card } from 'react-bootstrap'
import { ArrowUp, ArrowDown } from 'react-bootstrap-icons'

export default function StatsCard({ title, value, change, icon, color }) {
  const isPositive = change.startsWith('+')
  
  return (
    <Card className={`border-0 bg-${color} text-white`}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="mb-2">{title}</h6>
            <h3 className="mb-1">{value}</h3>
            <small className="d-flex align-items-center">
              {isPositive ? (
                <ArrowUp className="me-1" />
              ) : (
                <ArrowDown className="me-1" />
              )}
              {change}
            </small>
          </div>
          <div className="bg-white bg-opacity-25 rounded-circle p-3">
            <i className={`bi bi-${icon} fs-4`}></i>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}
