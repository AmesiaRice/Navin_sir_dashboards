'use client'
import React, { useEffect, useState } from 'react';
import mockOrders from '../../mock';
import OrderCard from '../../components/OrderCard';
import Navbar from '../../components/Navbar';

export default function Pending() {
  const [pendingOrder, setPendingOrders] = useState([]);

  useEffect(() => {
    // Filter only the orders which are NOT delivered
    const steps = [
      "Order confirmation",
      "Packing Material Received",
      "Packing of goods",
      "Dispatch to port",
      "Receiving of goods at port",
      "Vessel Dispatch",
      "Goods received at party's port"
    ];

    const pending = mockOrders.filter(order => {
      const isDelivered = steps.every(
        step => (order[`Status (${step})`] || '').toLowerCase() === 'done'
      );
      return !isDelivered; // Only take orders that are NOT delivered
    });

    setPendingOrders(pending);
  }, []);

  return (
    <div className="p-6">
        <Navbar/>
      {/* ✅ Display All Matching Orders */}
      {pendingOrder.length > 0 && (
        <div>
           {pendingOrder.length > 0 ? (
        <div>
          {pendingOrder.map(order => (
            <OrderCard key={order["Order ID"]} order={order} />
          ))}
        </div>
      ) : (
        <p>No pending orders found.</p>
      )}
        </div>
      )}
    </div>
  );
}
