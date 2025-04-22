'use client'
import React from 'react';
import ProgressBar from './ProgressBar';

export default function OrderCard({ order }) {
  const isDelivered = order.Steps?.every(step => step.Status?.toLowerCase() === 'done');

  return (
    <div className="border p-4 mb-4 rounded shadow-md">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-lg font-semibold">
            {order.PartyName} – {order.OrderID}
          </h2>
          <h2>Party id – {order.PartyUniqueID}</h2>
        </div>
        {isDelivered && (
          <span className="bg-green-600 text-white px-3 py-1 text-sm rounded-full">
            ✅ Delivered
          </span>
        )}
      </div>

      <p>
        <strong>Country:</strong> {order.Country} &nbsp;|&nbsp;
        <strong>Contact:</strong> {order.ContactNo} &nbsp;|&nbsp;
        <strong>Brand:</strong> {order.BrandName} &nbsp;|&nbsp;
        <strong>Qty:</strong> {order.Quantity}
      </p>

      <ProgressBar steps={order.Steps} />
    </div>
  );
}
