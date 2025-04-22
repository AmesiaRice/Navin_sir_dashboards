'use client'
import React, { useEffect, useState } from 'react';
import mockOrders from '../mock';
import OrderCard from '../components/OrderCard';

export default function ClientDashboard() {
  const [inputID, setInputID] = useState('');
  const [matchedOrders, setMatchedOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setAllOrders(mockOrders);
  }, []);

  const handleSearch = () => {
    const search = inputID.trim().toLowerCase();
    const matches = mockOrders.filter(order =>
      (order.OrderID || '').toLowerCase() === search ||
      (order.PartyUniqueID || '').toLowerCase() === search
    );

    if (matches.length > 0) {
      setMatchedOrders(matches);
      setError('');
    } else {
      setMatchedOrders([]);
      setError('⚠️ No orders found for that ID.');
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  };

  const dataToDisplay = inputID.trim() && matchedOrders.length > 0 ? matchedOrders : allOrders;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">📦 Track Your Export Orders</h1> */}

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
          <input
            type="text"
            value={inputID}
            onChange={(e) => setInputID(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key==='Enter'){
                handleSearch();
              }
            }}
            placeholder="Enter Order ID or Party Unique ID"
            className="border border-gray-300 px-5 py-3 rounded-lg w-full md:w-2/3 shadow-sm focus:ring-2 focus:ring-blue-300 outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow"
          >
            🔍 Search
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-6 text-center">
            {error}
          </div>
        )}

        {/* Results */}
        {dataToDisplay.length > 0 ? (
          <div className="space-y-6">
            {dataToDisplay.map(order => (
              <OrderCard key={order.OrderID} order={order} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No orders to display.</p>
        )}
      </div>
    </div>
  );
}
