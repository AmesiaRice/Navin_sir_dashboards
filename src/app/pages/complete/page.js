'use client'
import React, { useEffect, useState } from 'react';
import { getSheetData } from '../../lib/sheetData';
import OrderCard from '../../components/OrderCard';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/navigation';

export default function Complete() {
  const [orders, setOrders] = useState([]);
  const [completeOrder, setCompleteOrder] = useState([]);
  const [partyID, setPartyID] = useState('');
  const router = useRouter();

  // Step 1: Load data and get client ID
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

  // Step 2: Filter only complete orders for that Party ID
  useEffect(() => {
    if (orders.length > 0 && partyID) {
      const complete = orders.filter(order => {
        const isDelivered = order.Steps?.every(
          step => step.Status?.toLowerCase() === 'done'
        );
        return order.PartyUniqueID === partyID && isDelivered;
      });
      setCompleteOrder(complete);
    }
  }, [orders, partyID]);

  return (
    <div className="p-6">
      <Navbar />

      {completeOrder.length > 0 ? (
        <div className="space-y-6">
          {completeOrder.map(order => (
            <OrderCard key={order.OrderID} order={order} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No completed orders found.</p>
      )}
    </div>
  );
}
