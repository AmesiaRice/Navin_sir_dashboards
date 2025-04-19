'use client'
import React, { useEffect, useState } from 'react';
import mockOrders from '../mock';
import OrderCard from '../components/OrderCard';

export default function ClientDashboard() {
  const [inputID, setInputID] = useState('');
  const [matchedOrders, setMatchedOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(()=>{
   setAllOrders(mockOrders)
  },[])

  const handleSearch = () => {
    const search = inputID.trim().toLowerCase();

    // Match by Order ID or all orders with same Party Unique ID
    const matches = mockOrders.filter(order =>
      (order["Order ID"] || '').toLowerCase() === search ||
      (order["Party unqiue ID"] || '').toLowerCase() === search
    );

    if (matches.length > 0) {
      setMatchedOrders(matches);
      setError('');
    } else {
      setMatchedOrders([]);
      setError('No orders found for that ID.');
    }
  };

  const dataToDisplay = inputID.trim() && matchedOrders.length>0 ? matchedOrders : allOrders;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Track Your Export Orders</h1>

      {/* 🔍 Input for Order ID / Party Unique ID */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputID}
          onChange={(e) => setInputID(e.target.value)}
          placeholder="Enter Order ID or Party Unique ID"
          className="border px-4 py-2 rounded w-full md:w-1/2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* ❌ Error Message */}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* ✅ Display All Matching Orders */}
      {dataToDisplay.length > 0 && (
        <div>
          {dataToDisplay.map(order => (
            <OrderCard key={order["Order ID"]} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
