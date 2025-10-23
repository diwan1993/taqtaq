
import React from 'react';
// FIX: Added .tsx extension to the import path.
import { COURSES_DATA } from '../constants.tsx';
import CourseCard from './CourseCard.tsx';

const Courses: React.FC = () => {
  return (
    <div className="space-y-6">
       <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">My Enrolled Courses</h2>
        <p className="text-gray-600">Here is a list of all the courses you are currently enrolled in for this semester.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COURSES_DATA.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;