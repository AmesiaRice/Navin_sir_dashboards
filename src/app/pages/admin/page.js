'use client'
import React, { useState, useEffect } from 'react';
import mockOrders from '../../mock.js';
import OrderCard from '../../components/OrderCard';
import DashboardMetrics from '../../components/DashboardMetrics';
import FilterBar from '../../components/FilterBar';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    country: '',
    brand: '',
    search: '',
  });

  useEffect(() => {
    setTimeout(() => {
      setOrders(mockOrders);
    }, 500);
  }, []);

  const filtered = orders.filter(order => {
    const matchCountry = filters.country ? order.Country.toLowerCase() === filters.country.toLowerCase() : true;
    const matchBrand = filters.brand ? order.BrandName.toLowerCase() === filters.brand.toLowerCase() : true;

    const searchText = filters.search.toLowerCase();
    const matchSearch = searchText === '' || (
      (order.PartyName || '').toLowerCase().includes(searchText) ||
      (order.OrderID || '').toLowerCase().includes(searchText) ||
      (order.ContactNo || '').toString().includes(searchText)
    );

    return matchCountry && matchBrand && matchSearch;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <DashboardMetrics orders={filtered} />
      <FilterBar filters={filters} setFilters={setFilters} />
      {filtered.length > 0 ? (
        filtered.map(order => (
          <OrderCard key={order.OrderID} order={order} />
        ))
      ) : (
        <p>No matching orders found.</p>
      )}
    </div>
  );
}
