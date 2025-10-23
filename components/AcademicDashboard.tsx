import React from 'react';

const AcademicDashboard: React.FC = () => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-800">Academic Staff Dashboard</h2>
                <p className="mt-2 text-gray-600">Welcome! Manage your courses, grades, and student interactions here.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800">My Courses</h3>
                    <p className="text-gray-600 mt-1">View and manage the courses you are teaching this semester.</p>
                    {/* Placeholder for course list */}
                </div>
                 <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800">Upcoming Classes</h3>
                     <p className="text-gray-600 mt-1">Your schedule for the upcoming week.</p>
                    {/* Placeholder for schedule */}
                </div>
            </div>
        </div>
    );
};

export default AcademicDashboard;