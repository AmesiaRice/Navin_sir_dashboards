import React from 'react';

export default function DashboardMetrics({ orders }) {
  const total = orders.length;
  const delivered = orders.filter(order => 
    (order["Status (Goods received at party's port)"] || '').toLowerCase() === 'done'
  ).length;
  const pending = total - delivered;
  const deliveryRate = ((delivered / total) * 100).toFixed(1);

  return (
    <div className="flex justify-around p-4 bg-gray-100 rounded mb-4">
      <div><strong>Total Orders:</strong> {total}</div>
      <div><strong>Delivered:</strong> {delivered}</div>
      <div><strong>Pending:</strong> {pending}</div>
      <div><strong>Delivery Rate:</strong> {deliveryRate}%</div>
    </div>
  );
}
