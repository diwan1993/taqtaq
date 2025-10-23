

import React from 'react';
// FIX: Added .ts extension to the import path.
import type { FeeDetails } from '../types.ts';

interface FeeStatusProps {
  data: FeeDetails;
}

const FeeStatus: React.FC<FeeStatusProps> = ({ data }) => {
  const paidPercentage = (data.paid / data.total) * 100;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Fee Status</h3>
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total Fees</span>
          <span className="font-semibold text-gray-800">${data.total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Paid</span>
          <span className="font-semibold text-green-600">${data.paid.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${paidPercentage}%` }}></div>
        </div>
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Amount Due</p>
              <p className="text-2xl font-bold text-red-500">${data.due.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Due Date</p>
              <p className="font-semibold text-gray-800">{new Date(data.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
            </div>
          </div>
        </div>
        <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 mt-2">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default FeeStatus;