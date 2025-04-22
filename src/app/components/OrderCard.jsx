'use client'
import React from 'react';
import ProgressBar from './ProgressBar';
import jsPDF from 'jspdf';

export default function OrderCard({ order }) {
  const isDelivered = order.Steps?.every(step => step.Status?.toLowerCase() === 'done');

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text(`Export Order Summary`, 10, 10);

    doc.setFontSize(12);
    doc.text(`Party Name: ${order.PartyName}`, 10, 20);
    doc.text(`Party ID: ${order.PartyUniqueID}`, 10, 30);
    doc.text(`Order ID: ${order.OrderID}`, 10, 40);
    doc.text(`Country: ${order.Country}`, 10, 50);
    doc.text(`Brand: ${order.BrandName}`, 10, 60);
    doc.text(`Quantity: ${order.Quantity}`, 10, 70);

    let y = 80;
    doc.text(`Order Progress:`, 10, y);

    order.Steps.forEach((step, index) => {
      y += 10;
      doc.text(`${index + 1}. ${step.Step}`, 12, y);
      y += 6;
      doc.text(`Status: ${step.Status}`, 20, y);
      doc.text(`Planned: ${new Date(step.Planned).toLocaleDateString()}`, 70, y);
      doc.text(`Actual: ${step.Actual ? new Date(step.Actual).toLocaleDateString() : '—'}`, 130, y);
    });

    doc.save(`${order.OrderID}_ExportOrder.pdf`);
  };

  return (
    <div className="border border-gray-200 p-6 mb-6 rounded-xl shadow-md bg-white hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {order.PartyName} – <span className="text-blue-700">{order.OrderID}</span>
          </h2>
          <p className="text-sm text-gray-600">Party ID: {order.PartyUniqueID}</p>
        </div>

        {isDelivered && (
          <div className="flex items-center gap-3">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              ✅ Delivered
            </span>
            <button
              onClick={handleDownloadPDF}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-semibold shadow"
            >
              ⬇ Download PDF
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700 mb-4">
        <p><strong>Country:</strong> {order.Country}</p>
        <p><strong>Contact:</strong> {order.ContactNo}</p>
        <p><strong>Brand:</strong> {order.BrandName}</p>
        <p><strong>Quantity:</strong> {order.Quantity}</p>
      </div>

      <ProgressBar steps={order.Steps} />
    </div>
  );
}
