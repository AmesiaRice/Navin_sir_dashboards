'use client'
import React, { useEffect, useState } from 'react';
import mockOrders from '../../mock';
import OrderCard from '../../components/OrderCard';
import Navbar from '../../components/Navbar';

export default function Complete() {
  const [completeOrder, setCompleteOrder] = useState([]);

  useEffect(() => {
    const complete = mockOrders.filter(order => {
      const isDelivered = order.Steps?.every(
        step => step.Status?.toLowerCase() === 'done'
      );
      return isDelivered; // Only take orders that are fully delivered
    });

    setCompleteOrder(complete);
  }, []);

  return (
    <div className="p-6">
      <Navbar />
      {completeOrder.length > 0 ? (
        <div>
          {completeOrder.map(order => (
            <OrderCard key={order.OrderID} order={order} />
          ))}
        </div>
      ) : (
        <p>No completed orders found.</p>
      )}
    </div>
  );
}
