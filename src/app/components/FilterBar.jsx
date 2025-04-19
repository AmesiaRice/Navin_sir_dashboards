'use client'
import React from 'react';

export default function FilterBar({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      {/* 🔍 Search Input */}
      <input
        type="text"
        name="search"
        value={filters.search}
        onChange={handleChange}
        placeholder="Search by Party, Order ID or Number"
        className="border px-3 py-2 rounded w-full md:w-1/3"
      />

      {/* 🌍 Country Filter */}
      <select name="country" value={filters.country} onChange={handleChange} className="border p-2 rounded">
        <option value="">All Countries</option>
        <option value="dubai">Dubai</option>
        <option value="Malaysia">Malaysia</option>
        <option value="Iraq">Iraq</option>
      </select>

      {/* 🏷️ Brand Filter */}
      <select name="brand" value={filters.brand} onChange={handleChange} className="border p-2 rounded">
        <option value="">All Brands</option>
        <option value="excel">Excel</option>
        <option value="super">Super</option>
        <option value="wattan se">Wattan Se</option>
      </select>
    </div>
  );
}
