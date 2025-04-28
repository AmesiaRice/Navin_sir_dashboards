'use client'
import React from 'react';
import { Download, CheckCircle, Clock, Truck } from 'lucide-react';

export default function OrderCard({ order }) {
  const isDelivered = order.Steps?.every(step => step.Status?.toLowerCase() === 'done');
  const lastDoneIndex = order.Steps?.map(s => s.Status.toLowerCase()).lastIndexOf('done');
  const shouldShowTruck = !isDelivered && lastDoneIndex !== -1;

  // ✅ Download the PDF from App Script
  const handleDownloadPDF = () => {
    const apiURL = `/api/download?orderId=${encodeURIComponent(order.OrderID)}`;
    window.open(apiURL, '_blank');
  };
  

  return (
    <div className="bg-gradient-to-br from-white to-gray-200 rounded-xl shadow-md px-5 py-6 mb-6 w-full transition-all hover:shadow-lg relative">
      <div className="flex justify-between items-center mb-4">
        <div className="text-xs text-gray-400 font-medium tracking-wide">{order.PartyUniqueID}</div>
        {isDelivered && (
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 text-xs text-blue-600 hover:underline"
          >
            <Download size={16} /> PDF
          </button>
        )}
      </div>

      {/* Basic Info */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{order.PartyName}</h2>
          <p className="text-xs text-gray-500 mt-1">Order ID: {order.OrderID}</p>
          <p className="text-xs text-gray-500 mt-1">Invoice No: {order.InvoiceNumber}</p>
        </div>
        <div className="mt-2 md:mt-0 flex flex-wrap gap-3 text-xs text-gray-600">
          <span><strong>Country:</strong> {order.Country}</span>
          <span><strong>Brand:</strong> {order.BrandName}</span>
          <span><strong>Qty(MT):</strong> {order.Quantity}</span>
        </div>
      </div>

      {/* Responsive Step Progress */}
      <div className="mt-6 pb-4">
        <div className="md:hidden flex flex-col gap-6">
          {order.Steps.map((step, idx) => {
            const isDone = step.Status.toLowerCase() === 'done';
            const isPending = step.Status.toLowerCase() === 'pending';
            const icon = isDone ? (
              <CheckCircle size={20} className="text-green-500" />
            ) : (
              <Clock size={20} className="text-yellow-500" />
            );
            return (
              <div key={idx} className="relative border-l-4 border-blue-200 pl-4">
                <div className="text-sm font-semibold text-gray-800">{step.Step}</div>
                <div className="text-xs text-gray-500">{step.Actual ? new Date(step.Actual).toLocaleDateString() : 'Planned'}</div>
                <div className={`text-xs font-medium ${
                  isDone ? 'text-green-600' : isPending ? 'text-yellow-600' : 'text-gray-400'
                }`}>{step.Status}</div>
              </div>
            );
          })}
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex relative justify-between items-center">
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-300 z-0" />
          {shouldShowTruck && (
            <div
              className="absolute -top-0 z-20 transition-all duration-500 ease-in-out"
              style={{
                left: `calc(${(100 / (order.Steps.length - 1)) * lastDoneIndex}%)`,
                transform: 'translateX(-50%)'
              }}
            >
              <Truck size={28} className="text-blue-600 animate-bounce" />
            </div>
          )}
          {order.Steps.map((step, idx) => {
            const isDone = step.Status.toLowerCase() === 'done';
            const isPending = step.Status.toLowerCase() === 'pending';
            const icon = isDone ? (
              <CheckCircle size={18} className="text-green-500" />
            ) : (
              <Clock size={18} className="text-yellow-500" />
            );
            return (
              <div key={idx} className="relative flex flex-col items-center text-center z-10 w-[120px]">
                <div className="mb-1">{icon}</div>
                <div className="text-xs font-medium text-gray-800 truncate">{step.Step}</div>
                <div className="text-[11px] text-gray-500">
                  {step.Actual ? new Date(step.Actual).toLocaleDateString() : 'Planned'}
                </div>
                <div className={`text-[11px] capitalize font-medium ${
                  isDone ? 'text-green-600' :
                  isPending ? 'text-yellow-600' :
                  'text-gray-400'
                }`}>
                  {step.Status}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
