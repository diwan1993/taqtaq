// FIX: Provided full implementation for StudentDashboardForStaff component.
import React from 'react';
import type { Student } from '../types.ts';
import ProfileCard from './ProfileCard.tsx';
import { GRADES_DATA, ATTENDANCE_SUMMARY_DATA } from '../constants.tsx';
import AttendanceChart from './AttendanceChart.tsx';
import Grades from './Grades.tsx';


interface StudentDashboardForStaffProps {
    student: Student;
    onBack: () => void;
}

const StudentDashboardForStaff: React.FC<StudentDashboardForStaffProps> = ({ student, onBack }) => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Student Dashboard: {student.name}</h2>
                <button onClick={onBack} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300">
                    &larr; Back to Student List
                </button>
            </div>
            
            <ProfileCard student={student} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Grades />
                </div>
                <div className="space-y-6">
                    <AttendanceChart data={ATTENDANCE_SUMMARY_DATA} />
                </div>
            </div>
        </div>
    );
};

export default StudentDashboardForStaff;
