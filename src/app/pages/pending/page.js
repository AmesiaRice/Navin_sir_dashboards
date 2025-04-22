'use client'
import React, { useEffect, useState } from 'react';
import mockOrders from '../../mock';
import OrderCard from '../../components/OrderCard';
import Navbar from '../../components/Navbar';

export default function Pending() {
  const [pendingOrder, setPendingOrders] = useState([]);

  useEffect(() => {
    const pending = mockOrders.filter(order => {
      const isDelivered = order.Steps?.every(
        step => step.Status?.toLowerCase() === 'done'
      );
      return !isDelivered; // Only take orders that are NOT delivered
    });

    setPendingOrders(pending);
  }, []);

  return (
    <div className="p-6">
      <Navbar />
      
      {pendingOrder.length > 0 ? (
        <div>
          {pendingOrder.map(order => (
            <OrderCard key={order.OrderID} order={order} />
          ))}
        </div>
      ) : (
        <p>No pending orders found.</p>
      )}
    </div>
  );
}
