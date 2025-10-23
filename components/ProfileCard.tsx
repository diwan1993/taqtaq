

import React from 'react';
// FIX: Added .ts extension to the import path.
import type { Student } from '../types.ts';

interface ProfileCardProps {
  student: Student;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ student }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-6">
      <img src={student.profilePictureUrl} alt={student.name} className="w-24 h-24 rounded-full object-cover border-4 border-blue-200" />
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{student.name}</h2>
        <p className="text-gray-600">{student.program}</p>
        <div className="mt-2 text-sm text-gray-500 space-x-4">
          <span>ID: <span className="font-semibold text-gray-700">{student.id}</span></span>
          <span>Year: <span className="font-semibold text-gray-700">{student.academicYear}</span></span>
          <span>Semester: <span className="font-semibold text-gray-700">{student.semester}</span></span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;