import StatsCard from '../components/Dashboard/StatsCard'
import RecentOrders from '../components/Dashboard/RecentOrders'
import SalesChart from '../components/Dashboard/SalesChart'

export default function Dashboard() {
  const statsData = [
    { title: 'Total Revenue', value: '12,345,000', change: '+12%', icon: 'currency-dollar', color: 'primary' },
    { title: 'Total Orders', value: '156', change: '+8%', icon: 'cart', color: 'success' },
    { title: 'New Customers', value: '24', change: '+5%', icon: 'people', color: 'info' },
    { title: 'Pending Orders', value: '8', change: '-2%', icon: 'clock-history', color: 'warning' }
  ]

  return (
    <div>
      <h4 className="mb-4">Dashboard Overview</h4>
      
      <div className="row mb-4">
        {statsData.map((stat, index) => (
          <div key={index} className="col-md-3 mb-3">
            <StatsCard {...stat} />
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Sales Analytics</h5>
              <SalesChart />
            </div>
          </div>
        </div>
        
        <div className="col-lg-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Recent Orders</h5>
              <RecentOrders />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
