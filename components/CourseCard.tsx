

import React from 'react';
// FIX: Added .ts extension to the import path.
import type { Course } from '../types.ts';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-gray-500">{course.code}</p>
          <h4 className="font-semibold text-gray-800">{course.name}</h4>
          <p className="text-sm text-gray-500">by {course.faculty}</p>
        </div>
        <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">{course.credits} Cr</span>
      </div>
      <div className="mt-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-blue-700">{course.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;