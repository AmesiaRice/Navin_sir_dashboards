'use client'
import React from 'react';

export default function ProgressBar({ steps, order }) {
  return (
    <div className="flex mt-4 gap-2">
      {steps.map((step, i) => {
        const status = order[`Status (${step})`] || 'Pending';
        const isComplete = status.toLowerCase() === 'done';
        return (
          <div key={i} className={`p-2 rounded-full ${isComplete ? 'bg-green-500' : 'bg-yellow-400'}`}>
            <span className="text-white text-sm">{step.split('  ')[0]}</span>
          </div>
        );
      })}
    </div>
  );
}
