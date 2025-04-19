'use client'
import React from 'react';
import ProgressBar from './ProgressBar';

export default function OrderCard({ order }) {
  const steps = [
    "Order confirmation",
    "Packing Material Received",
    "Packing of goods",
    "Dispatch to port",
    "Receiving of goods at port",
    "Vessel Dispatch",
    "Goods received at party's port"
  ];

  // ✅ Check if all steps are marked as "Done"
  const isDelivered = steps.every(
    step => (order[`Status (${step})`] || '').toLowerCase() === 'done'
  );

  return (
    <div className="border p-4 mb-4 rounded shadow-md">
      <div className="flex justify-between items-center mb-2">
       <div>
       <h2 className="text-lg font-semibold">
          {order["Party Name"]} – {order["Order ID"]}
        </h2>
        <h2>Party id – {order["Party unqiue ID"]}</h2>
       </div>
        {isDelivered && (
          <span className="bg-green-600 text-white px-3 py-1 text-sm rounded-full">
            ✅ Delivered
          </span>
        )}
      </div>

      <p>
        <strong>Country:</strong> {order.Country} &nbsp;|&nbsp;
        <strong>Contact:</strong> {order["Contact No"]} &nbsp;|&nbsp;
        <strong>Brand:</strong> {order["Brand Name"]} &nbsp;|&nbsp;
        <strong>Qty:</strong> {order.Quantity}
      </p>

      {/* 🚚 Progress Tracker */}
      <ProgressBar steps={steps} order={order} />
    </div>
  );
}
