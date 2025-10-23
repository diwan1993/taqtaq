// FIX: Provided full implementation for MyStudentsStaff component.
import React, { useState } from 'react';
import { STUDENTS_DATA_MANAGEMENT, COURSES_DATA } from '../constants.tsx';
import type { Student } from '../types.ts';
import StudentDashboardForStaff from './StudentDashboardForStaff.tsx';

const MyStudentsStaff: React.FC = () => {
    const [selectedCourse, setSelectedCourse] = useState<string>(COURSES_DATA[0].id);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    // In a real app, you'd filter students based on course enrollment.
    // Here we'll just show all students as a placeholder.
    const students = STUDENTS_DATA_MANAGEMENT;
    
    if (selectedStudent) {
        return <StudentDashboardForStaff student={selectedStudent} onBack={() => setSelectedStudent(null)} />;
    }

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-gray-800">My Students</h2>
                <div className="mt-4">
                    <label htmlFor="course-select" className="block text-sm font-medium text-gray-700">Select a course to view students:</label>
                    <select
                        id="course-select"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                        {COURSES_DATA.map(course => (
                            <option key={course.id} value={course.id}>
                                {course.name} ({course.code})
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {students.map(student => (
                            <tr key={student.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{student.program}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <button onClick={() => setSelectedStudent(student)} className="text-blue-600 hover:text-blue-800">
                                        View Dashboard
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyStudentsStaff;
