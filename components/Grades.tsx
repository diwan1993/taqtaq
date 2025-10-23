
import React from 'react';
// FIX: Added .tsx extension to the import path.
import { GRADES_DATA } from '../constants.tsx';
// FIX: Added .ts extension to the import path.
import type { Grade } from '../types.ts';

const getGradeColor = (grade: Grade['grade']) => {
    switch(grade) {
        case 'A': return 'bg-green-100 text-green-800';
        case 'B': return 'bg-blue-100 text-blue-800';
        case 'C': return 'bg-yellow-100 text-yellow-800';
        case 'D': return 'bg-orange-100 text-orange-800';
        case 'F': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

const Grades: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">My Grades</h2>
        <p className="text-gray-600 mb-6">A summary of your academic performance and grades for completed courses.</p>
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Code</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {GRADES_DATA.map((grade) => (
                        <tr key={grade.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{grade.courseCode}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{grade.courseName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{grade.credits}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getGradeColor(grade.grade)}`}>
                                    {grade.grade}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default Grades;