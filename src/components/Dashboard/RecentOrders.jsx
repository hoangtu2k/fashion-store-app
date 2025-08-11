export default function RecentOrders() {
  const orders = [
    { id: 'ORD-1001', customer: 'Nguyễn Văn A', amount: 750000, status: 'Completed' },
    { id: 'ORD-1002', customer: 'Trần Thị B', amount: 1200000, status: 'Processing' },
    { id: 'ORD-1003', customer: 'Lê Văn C', amount: 500000, status: 'Pending' },
  ]

  const getStatusClass = (status) => {
    switch(status) {
      case 'Completed': return 'bg-success'
      case 'Processing': return 'bg-primary'
      case 'Pending': return 'bg-warning text-dark'
      default: return 'bg-secondary'
    }
  }

  return (
    <div className="table-responsive">
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.amount.toLocaleString()} VND</td>
              <td>
                <span className={`badge ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
