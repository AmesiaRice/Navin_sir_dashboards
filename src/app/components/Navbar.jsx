'use client'

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); // ✅ Get current route

  const linkClass = (path) =>
    pathname === path
      ? "text-blue-600 font-semibold" // Active
      : "text-gray-700";              // Inactive

  return (
    <nav className="bg-white shadow-md w-full z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">
          AmasiaRice
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 font-medium">
          <Link href="/" className={linkClass("/")}>Total</Link>
          <Link href="/pages/pending" className={linkClass("/pages/pending")}>Pending</Link>
          <Link href="/pages/complete" className={linkClass("/pages/complete")}>Complete</Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Links */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 font-medium flex flex-col">
          <Link href="/" className={linkClass("/")} onClick={() => setMenuOpen(false)}>Total</Link>
          <Link href="/pages/pending" className={linkClass("/pages/pending")} onClick={() => setMenuOpen(false)}>Pending</Link>
          <Link href="/pages/complete" className={linkClass("/pages/complete")} onClick={() => setMenuOpen(false)}>Complete</Link>
        </div>
      )}
    </nav>
  );
}
