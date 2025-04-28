'use client'
import React, { useEffect, useState } from 'react';
import { getSheetData } from '../../lib/sheetData';
import OrderCard from '../../components/OrderCard';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/navigation';

export default function Pending() {
  const [orders, setOrders] = useState([]);
  const [pendingOrder, setPendingOrders] = useState([]);
  const [partyID, setPartyID] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedID = localStorage.getItem('clientPartyID');
    if (!storedID) {
      router.push('/login');
      return;
    }
    setPartyID(storedID);

    getSheetData().then(({ orders }) => {
      setOrders(orders);
    });
  }, [router]);

  useEffect(() => {
    if (orders.length > 0 && partyID) {
      const pending = orders.filter(order => {
        const isDelivered = order.Steps?.every(
          step => step.Status?.toLowerCase() === 'done'
        );
        return order.PartyUniqueID === partyID && !isDelivered;
      });
      setPendingOrders(pending);
    }
  }, [orders, partyID]);

  // ✅ Pending Summary
  const pendingSummary = pendingOrder.map(order => {
    const pendingSteps = order.Steps?.filter(step => step.Status?.toLowerCase() !== 'done') || [];
    return {
      orderId: order.OrderID,
      BrandName: order.BrandName,
      quantity: pendingSteps.length > 0 ? order.Quantity : 0
    };
  });

  // ✅ Total Quantity Calculation
  const totalPendingQuantity = pendingSummary.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <div className="p-6">
      <Navbar />
      <h1 className="text-2xl font-bold text-center mb-8">Pending Orders</h1>

      {/* ✅ Pending Summary Table */}
      {pendingSummary.length > 0 && (
        <div className="bg-blue-50 p-6 rounded-lg mb-8 shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-blue-700">📋 Pending Summary</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-blue-100 text-gray-800">
                <tr>
                  <th className="py-2 px-4 text-left">Order ID</th>
                  <th className="py-2 px-4 text-left">Brand Name</th>
                  <th className="py-2 px-4 text-left">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {pendingSummary.map((item, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-2 px-4">{item.orderId}</td>
                    <td className="py-2 px-4">{item.BrandName}</td>
                    <td className="py-2 px-4">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>

              {/* ✅ Total Row */}
              <tfoot>
                <tr className="font-semibold bg-blue-100 text-blue-900">
                  <td className="py-2 px-4">Total</td>
                  {/* {pendingSummary.reduce((sum, item) => sum + item.pendingStepsCount, 0)} */}
                  <td className="py-2 px-4"></td>
                  <td className="py-2 px-4">{totalPendingQuantity}</td>
                </tr>
              </tfoot>

            </table>
          </div>
        </div>
      )}

      {/* ✅ Pending Orders List */}
      {pendingOrder.length > 0 ? (
        <div className="space-y-6">
          {pendingOrder.map((order, index) => (
            <OrderCard key={`${order.OrderID}_${order.PartyUniqueID}_${index}`} order={order} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No pending orders found.</p>
      )}
    </div>
  );
}
