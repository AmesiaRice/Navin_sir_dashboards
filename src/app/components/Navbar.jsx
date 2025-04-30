'use client'

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (path) =>
    pathname === path
      ? 'text-blue-600 font-semibold'
      : 'text-gray-700 hover:text-blue-600 transition-colors';

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Total', path: '/pages/total' },
    { name: 'Processing', path: '/pages/processing' },
    { name: 'Complete', path: '/pages/complete' },
    { name: 'Pending', path: '/pages/pending' },
  ];

  return (
    <nav className="bg-white shadow-md w-full z-50 sticky top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-blue-700">AmasiaRice</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path} className={linkClass(item.path)}>
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800 text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✖' : '☰'}
        </button>
      </div>

      {/* Mobile Links */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96 py-3 px-4' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col space-y-3 font-medium text-sm">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={linkClass(item.path)}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
