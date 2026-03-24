import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaBook, FaShoppingCart } from "react-icons/fa";
import { BiRupee } from "react-icons/bi";
import { toast } from "react-toastify";

import { userApiService } from "../../services/userService";
import { productService } from "../../services/productService";
import { getAllOrders } from "../../services/adminOrderService";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, books: 0, orders: 0, revenue: 0 });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('bookbazaar_accessToken');
        if (!token) throw new Error("Admin token not found.");

        const [usersResponse, productsResponse, ordersResponse] = await Promise.all([
          userApiService.fetchAllUsers(token),
          productService.getProducts({ size: 1 }),
          getAllOrders(0, 5)
        ]);

        const totalUsers = usersResponse?.length || 0;
        const baseRecentUsers = (usersResponse || []).slice(0, 5);

        const detailedUserPromises = baseRecentUsers.map(user => 
          userApiService.getUserById(user.id, token)
        );
        const detailedUserResults = await Promise.all(detailedUserPromises);

        
        const enrichedRecentUsers = baseRecentUsers.map((baseUser, index) => {
          const detailedUser = detailedUserResults[index];
          return {
            ...baseUser, 
            status: detailedUser?.userStatus || 'N/A',
            role: detailedUser?.userType || 'N/A',
          };
        });
        setRecentUsers(enrichedRecentUsers);
        
        const userNamesMap = new Map();
        (usersResponse || []).forEach(user => {
          userNamesMap.set(user.id, `${user.firstName} ${user.lastName}`);
        });

        const totalBooks = productsResponse?.totalElements || 0;
        const totalOrders = ordersResponse?.totalElementCount || 0;

        const enrichedOrders = (ordersResponse.content || []).map(order => ({
          ...order,
          userName: userNamesMap.get(order.userId) || "Unknown User",
        }));
        setRecentOrders(enrichedOrders);

        const allOrdersData = await getAllOrders(0, 1000); 
        const deliveredOrders = (allOrdersData.content || []).filter(o => o.orderStatus === 'DELIVERED');
        const totalRevenue = deliveredOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
        
        setStats({
          users: totalUsers,
          books: totalBooks,
          orders: totalOrders,
          revenue: totalRevenue,
        });

      } catch (error) {
        toast.error("Failed to load dashboard data.");
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <section className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <SummaryCard title="Users" value={stats.users} icon={<FaUsers />} color="indigo" loading={loading} />
        <SummaryCard title="Books" value={stats.books} icon={<FaBook />} color="green" loading={loading} />
        <SummaryCard title="Orders" value={stats.orders} icon={<FaShoppingCart />} color="yellow" loading={loading} />
        <SummaryCard title="Revenue" value={`₹${stats.revenue.toFixed(2)}`} icon={<BiRupee className="text-4xl" />} color="red" loading={loading} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <AdminButton to="/admin/users" label="Manage Users" />
        <AdminButton to="/admin/orders" label="View Orders" />
        <AdminButton to="/admin/add-book" label="Add New Book" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PreviewTable
          title="Recent Users"
          headers={["Name", "Email", "Status", "Role"]}
          data={recentUsers}
          loading={loading}
          renderRow={(user) => [
            `${user.firstName} ${user.lastName}`,
            user.email,
            capitalize(user.status), 
            capitalize(user.role),  
          ]}
        />
        <PreviewTable
          title="Recent Orders"
          headers={["Order No.", "User", "Total"]}
          data={recentOrders}
          loading={loading}
          renderRow={(order) => [
            formatOrderId(order.id),
            order.userName,
            `₹${(order.totalAmount || 0).toFixed(2)}`
          ]}
        />
      </div>
    </section>
  );
};


const SummaryCard = ({ title, value, icon, color, loading }) => {
    const colorClasses = {
      indigo: 'text-indigo-600', green: 'text-green-600',
      yellow: 'text-yellow-600', red: 'text-red-600',
    };
  
    return (
      <div className={`bg-white p-6 rounded-xl shadow-md flex items-center gap-4`}>
        <div className={`text-3xl ${colorClasses[color]}`}>{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          {loading ? (
            <div className="h-7 w-24 bg-gray-200 rounded-md animate-pulse mt-1"></div>
          ) : (
            <p className="text-xl font-bold text-gray-800">{value}</p>
          )}
        </div>
      </div>
    );
};
  
const AdminButton = ({ to, label }) => (
    <Link to={to} className="bg-indigo-600 text-white text-center py-3 rounded-xl font-semibold shadow-md hover:bg-indigo-700 transition">
        {label}
    </Link>
);

const PreviewTable = ({ title, headers, data, renderRow, loading }) => (
    <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b">
            {headers.map((header, i) => (
              <th key={i} className="py-2 px-3 text-gray-600 font-medium">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b"><td colSpan={headers.length} className="py-3 px-3"><div className="h-4 bg-gray-200 rounded-md animate-pulse"></div></td></tr>
            ))
          ) : data.length === 0 ? (
            <tr><td colSpan={headers.length} className="py-4 text-center text-gray-500">No data available.</td></tr>
          ) : (
            data.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition border-b">
                {renderRow(item).map((cell, i) => (
                  <td key={i} className="py-2 px-3 text-gray-700">{cell}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
);

const capitalize = (str) => {
    if (typeof str !== 'string' || !str) return 'N/A';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
  
const formatOrderId = (id) => id ? id.split('-')[0].toUpperCase() : "N/A";

export default AdminDashboard;