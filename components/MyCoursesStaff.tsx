// FIX: Provided full implementation for MyCoursesStaff component.
import React, { useState } from 'react';
import { COURSES_DATA } from '../constants.tsx';
import AddCourseModal from './AddCourseModal.tsx';
import type { Course } from '../types.ts';

const MyCoursesStaff: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>(COURSES_DATA);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleAddCourse = (course: Omit<Course, 'id' | 'progress'>) => {
        const newCourse = {
            ...course,
            id: `C-${Date.now()}`,
            progress: 0
        };
        setCourses(prev => [...prev, newCourse]);
        setIsAddModalOpen(false);
    };

    return (
        <>
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
                        <p className="mt-1 text-gray-600">Manage courses you are teaching.</p>
                    </div>
                    <button onClick={() => setIsAddModalOpen(true)} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600">
                        Add Course
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map(course => (
                        <div key={course.id} className="bg-white p-4 rounded-lg shadow">
                            <h3 className="font-bold">{course.name} ({course.code})</h3>
                            <p>Credits: {course.credits}</p>
                            {/* Further course management options can go here */}
                        </div>
                    ))}
                </div>
            </div>
            <AddCourseModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAddCourse={handleAddCourse}
            />
        </>
    );
};

export default MyCoursesStaff;
