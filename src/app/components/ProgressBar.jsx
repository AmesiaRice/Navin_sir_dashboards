'use client'
import React from 'react';

export default function ProgressBar({ steps }) {
  return (
    <div className="flex text-sm overflow-x-auto gap-2 mt-4">
      {steps.map((step, i) => {
        const status = step.Status?.toLowerCase();
        const isDone = status === 'done';
        const isPending = status === 'pending';

        // Show Actual if exists, else Planned
        const dateToShow = step.Actual || step.Planned || '';
        const displayDate = dateToShow ? new Date(dateToShow).toLocaleDateString() : '—';

        return (
          <div
            key={i}
            className={`px-3 py-2 rounded-full text-white whitespace-nowrap
              ${isDone ? 'bg-green-600' : isPending ? 'bg-yellow-500' : 'bg-gray-400'}`}
          >
            <strong>{step.Step}:</strong> {displayDate}
          </div>
        );
      })}
    </div>
  );
}
