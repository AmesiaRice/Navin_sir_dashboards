'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSheetData } from '../../lib/sheetData';

export default function ClientLogin() {
  const router = useRouter();
  const [partyID, setPartyID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    getSheetData().then(({ credentials }) => {
      setCredentials(credentials);
    });
  }, []);

  const handleLogin = () => {
    const cleanPartyID = partyID.trim().toLowerCase();
    const cleanPassword = password.trim();
    const user = credentials.find(user =>
      String(user.PartyUniqueID).trim().toLowerCase() === cleanPartyID &&
      String(user.Password).trim() === cleanPassword
    );

    if (user) {
      localStorage.setItem('clientPartyID', user.PartyUniqueID);
      router.push('/');
    } else {
      setError('❌ Invalid Party ID or Password');
      setTimeout(() => setError(''), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">🔐 Client Login</h2>

        <input
          type="text"
          value={partyID}
          onChange={(e) => setPartyID(e.target.value)}
          placeholder="Party ID"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 outline-none"
        />

        {error && <p className="text-red-600 text-center mb-3">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
