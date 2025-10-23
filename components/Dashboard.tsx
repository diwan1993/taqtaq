import React from 'react';
import ProfileCard from './ProfileCard.tsx';
import AttendanceChart from './AttendanceChart.tsx';
import UpcomingEvents from './UpcomingEvents.tsx';
import CourseCard from './CourseCard.tsx';
import type { Student, Course, AttendanceSummary, UpcomingEvent } from '../types.ts';

// Define props for the Dashboard
interface DashboardProps {
  student: Student;
  courses: Course[];
  attendanceSummary: AttendanceSummary;
  upcomingEvents: UpcomingEvent[];
}

const Dashboard: React.FC<DashboardProps> = ({ student, courses, attendanceSummary, upcomingEvents }) => {
  return (
    <div className="space-y-6">
      <ProfileCard student={student} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Current Courses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courses.slice(0, 4).map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>
             <UpcomingEvents events={upcomingEvents} />
        </div>
        <div className="space-y-6">
            <AttendanceChart data={attendanceSummary} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;