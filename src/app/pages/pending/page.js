'use client';
import Navbar from '@/app/components/Navbar';
import { getPendingOrders } from '@/app/lib/sheetData';
import React, { useEffect, useState } from 'react';

export default function PendingOrdersPage() {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  getPendingOrders().then((data) => {
    setPendingOrders(data);
    setLoading(false);
  });
}, []);

//   if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="p-6 mx-auto max-w-7xl">
      <Navbar />
      <h1 className="text-2xl font-bold text-blue-700 mb-6 mt-8 text-center">📦 Pending Orders</h1>

      {pendingOrders.length === 0 ? (
        <p className="text-center text-gray-500">No pending orders found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingOrders.map((order, index) => (
            <div key={`${order.OrderID}-${index}`} className="bg-white shadow-md rounded-xl p-5 transition hover:shadow-lg">
              <div className="mb-2 text-sm text-gray-400 font-semibold tracking-wide">
                {order.OrderID}
              </div>
              <h2 className="text-lg font-bold text-gray-800">{order.PartyName}</h2>
              <div className="mt-2 text-sm text-gray-600 space-y-1">
                <p><strong>Invoice:</strong> {order.InvoiceNumber}</p>
                <p><strong>Country:</strong> {order.Country}</p>
                <p><strong>Brand:</strong> {order.BrandName}</p>
                <p><strong>Qty (MT):</strong> {order.Quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
