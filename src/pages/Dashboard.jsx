import Sidebar from "../components/dashboard/Sidebar"
import Topbar from "../components/dashboard/Topbar"

import dashboardStats from "../data/dashboardStats"
import StatCard from "../components/dashboard/StatCard"

import OrdersTable from "../components/dashboard/OrdersTable"
import recentOrders from "../data/recentOrders"

import RevenueChart from "../components/dashboard/RevenueChart"
import chartData from "../data/chartData"

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#f8f5f2]">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-0 md:ml-64">

        {/* TOPBAR */}
        <Topbar />

        {/* PAGE CONTENT */}
        <div className="p-6 md:p-10">

          <h1 className="text-3xl md:text-4xl font-semibold text-[#805374]">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Welcome back to Bloom & Blossom admin panel.
          </p>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">

            {dashboardStats.map((stat, index) => (
              <StatCard
  key={index}
  title={stat.title}
  value={stat.value}
  icon={stat.icon}
/>
            ))}

          </div>
          <OrdersTable orders={recentOrders} />
          <RevenueChart data={chartData} />

        </div>
      </div>
    </div>
  )
}

export default Dashboard