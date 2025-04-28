'use client';
import React, { useEffect, useState } from 'react';
import { getSheetData } from '../lib/sheetData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { useRouter } from 'next/navigation';

export default function ClientCharts() {
  const router = useRouter();
  const [allOrders, setAllOrders] = useState([]);
  const [partyID, setPartyID] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedID = localStorage.getItem('clientPartyID');
    if (!storedID) {
      router.push('/pages/login');
      return;
    }
    setPartyID(storedID);

    getSheetData().then(({ orders }) => {
      const filtered = orders.filter(order => order.PartyUniqueID === storedID);
      setAllOrders(filtered);
      setLoading(false);
    });
  }, [router]);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  // 📅 Group data month-wise
  const monthData = {};

  allOrders.forEach(order => {
    if (order.Timestamp) {
      const date = new Date(order.Timestamp);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      monthData[monthYear] = (monthData[monthYear] || 0) + (Number(order.Quantity) || 0);
    }
  });

  const barChartData = Object.entries(monthData).map(([month, quantity]) => ({
    month,
    quantity
  }));

  // 🏷️ Group by BrandName
  const brandData = {};

  allOrders.forEach(order => {
    const brand = order.BrandName || 'Unknown';
    brandData[brand] = (brandData[brand] || 0) + (Number(order.Quantity) || 0);
  });

  const pieChartData = Object.entries(brandData).map(([brand, quantity]) => ({
    name: brand,
    value: quantity
  }));

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F', '#FFBB28'];

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* <h1 className="text-2xl font-bold text-center mb-8 text-blue-700">📊 Client Dashboard</h1> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 📊 Bar Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Order Quantities</h2>
             <div className="flex flex-col items-center mb-4">
    <h2 className="text-lg font-semibold text-gray-800">Monthly Order Quantities</h2>
  </div>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={barChartData}>
      <XAxis dataKey="month" />
      <YAxis
        label={{
          value: 'Quantity (in M.T.)',
          angle: -90,   // 🛑 Rotate it 90 degrees
          position: 'insideLeft',
          style: { textAnchor: 'middle', fill: '#555', fontSize: 12 }
        }}
      />
      <Tooltip />
      <Bar dataKey="quantity" fill="#4f46e5" radius={[10, 10, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
          </div>

          {/* 🥧 Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Brand Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
