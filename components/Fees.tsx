

import React from 'react';
// FIX: Added .tsx extension to the import path.
import { FEE_DATA, FEE_TRANSACTION_DATA } from '../constants.tsx';
import FeeStatus from './FeeStatus.tsx';

const Fees: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <FeeStatus data={FEE_DATA} />
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Payment History</h2>
          <p className="text-gray-600 mb-6">Here is a detailed record of all your fee transactions.</p>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {FEE_TRANSACTION_DATA.map((txn) => (
                  <tr key={txn.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(txn.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{txn.description}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-semibold ${txn.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                      {txn.type === 'credit' ? `+$${txn.amount.toLocaleString()}` : `-$${txn.amount.toLocaleString()}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fees;