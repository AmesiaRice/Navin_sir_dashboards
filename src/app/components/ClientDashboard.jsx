'use client';
import React, { useEffect, useState } from 'react';
import { getSheetData } from '../lib/sheetData';
import OrderCard from '../components/OrderCard';
import { useRouter } from 'next/navigation';

export default function ClientDashboard() {
  const router = useRouter();
  const [inputID, setInputID] = useState('');
  const [matchedOrders, setMatchedOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [partyID, setPartyID] = useState('');
  const [error, setError] = useState('');

  // Step 1: Load data + validate login
  useEffect(() => {
    const storedID = localStorage.getItem('clientPartyID');
    if (!storedID) {
      router.push('/pages/login');
      return;
    }
    setPartyID(storedID);

    getSheetData().then(({ orders }) => {
      setOrders(orders);
    });
  }, [router]);

  // Step 2: When orders are fetched & partyID available → filter
  useEffect(() => {
    if (orders.length > 0 && partyID) {
      const filtered = orders.filter(order => order.PartyUniqueID === partyID);
      setAllOrders(filtered);
    }
  }, [orders, partyID]);

  const handleSearch = () => {
    const search = inputID.trim().toLowerCase();
    const matches = allOrders.filter(order =>
      (order.OrderID || '').toLowerCase() === search
    );

    if (matches.length > 0) {
      setMatchedOrders(matches);
      setError('');
    } else {
      setMatchedOrders([]);
      setError('⚠️ No orders found for that ID.');
      setTimeout(() => setError(''), 2500);
    }
  };

  const dataToDisplay = inputID.trim() && matchedOrders.length > 0 ? matchedOrders : allOrders;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* 🔍 Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center items-center">
          <input
            type="text"
            value={inputID}
            onChange={(e) => setInputID(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Enter Order ID"
            className="w-full md:w-2/3 border border-gray-300 px-5 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 outline-none text-sm sm:text-base"
          />
          <button
            onClick={handleSearch}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow text-sm sm:text-base"
          >
            🔍 Search
          </button>
        </div>

        {/* ⚠️ Error */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-6 text-center text-sm sm:text-base">
            {error}
          </div>
        )}

        {/* ✅ Results */}
        {dataToDisplay.length > 0 ? (
          <div className="space-y-6">
            {dataToDisplay.map(order => (
              <OrderCard key={order.OrderID} order={order} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-sm sm:text-base">No orders to display.</p>
        )}
      </div>
    </div>
  );
}
