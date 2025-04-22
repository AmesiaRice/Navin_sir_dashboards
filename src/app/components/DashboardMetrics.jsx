import React from 'react';

export default function DashboardMetrics({ orders }) {
  const total = orders.length;
  const delivered = orders.filter(order =>
    order.Steps?.[order.Steps.length - 1]?.Status?.toLowerCase() === 'done'
  ).length;
  const pending = total - delivered;
  const deliveryRate = total > 0 ? ((delivered / total) * 100).toFixed(1) : 0;

  return (
    <div className="flex justify-around p-4 bg-gray-100 rounded mb-4">
      <div><strong>Total Orders:</strong> {total}</div>
      <div><strong>Delivered:</strong> {delivered}</div>
      <div><strong>Pending:</strong> {pending}</div>
      <div><strong>Delivery Rate:</strong> {deliveryRate}%</div>
    </div>
  );
}
