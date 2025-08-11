import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export default function SalesChart() {
  const chartRef = useRef(null)
  
  useEffect(() => {
    const ctx = chartRef.current.getContext('2d')
    
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Sales 2023',
            data: [1200000, 1900000, 1500000, 1800000, 2200000, 2500000],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: function(value) {
                return value.toLocaleString() + ' VND'
              }
            }
          }
        }
      }
    })
    
    return () => chart.destroy()
  }, [])
  
  return (
    <div className="chart-container">
      <canvas ref={chartRef}></canvas>
    </div>
  )
}
