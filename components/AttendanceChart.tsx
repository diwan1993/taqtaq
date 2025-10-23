

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// FIX: Added .ts extension to the import path.
import type { AttendanceSummary } from '../types.ts';

interface AttendanceChartProps {
  data: AttendanceSummary;
}

const AttendanceChart: React.FC<AttendanceChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Present', value: data.present },
    { name: 'Absent', value: data.absent },
  ];
  const COLORS = ['#3B82F6', '#EF4444']; // Blue for present, Red for absent

  const percentage = ((data.present / data.total) * 100).toFixed(1);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Attendance Summary</h3>
      <div className="w-full h-48 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
                <span className="text-3xl font-bold text-blue-600">{percentage}%</span>
                <p className="text-xs text-gray-500">Overall</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;