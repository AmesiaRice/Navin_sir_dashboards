'use client'
import React from 'react';

export default function ProgressBar({ steps }) {
  return (
    <div className="flex flex-wrap gap-3 mt-4">
      {steps.map((step, i) => {
        const isDone = step.Status?.toLowerCase() === 'done';
        const isPending = step.Status?.toLowerCase() === 'pending';

        // Display actual date if available, else planned
        const displayDate = step.Actual || step.Planned || '';
        const dateLabel = displayDate ? new Date(displayDate).toLocaleDateString() : '—';

        return (
          <div
            key={i}
            className={`rounded-xl px-4 py-2 shadow-sm border text-sm font-medium flex flex-col items-start min-w-[180px] transition-all duration-200
              ${isDone ? 'bg-green-100 border-green-300 text-green-800' :
                isPending ? 'bg-yellow-100 border-yellow-300 text-yellow-800' :
                  'bg-gray-100 border-gray-300 text-gray-700'}`}
          >
            <div className="mb-1 font-semibold">{step.Step}</div>
            <div className="text-xs">📅 {dateLabel}</div>
            <div className="text-xs">Status: {step.Status || 'N/A'}</div>
          </div>
        );
      })}
    </div>
  );
}
