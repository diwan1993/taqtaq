// FIX: Provided full implementation for AddCourseModal component.
import React, { useState } from 'react';
import type { Course } from '../types.ts';

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCourse: (course: Omit<Course, 'id' | 'progress'>) => void;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onClose, onAddCourse }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [faculty, setFaculty] = useState('');
  const [credits, setCredits] = useState(0);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code || !faculty || credits <= 0) {
      setError('All fields are required and credits must be positive.');
      return;
    }
    setError('');
    onAddCourse({ name, code, faculty, credits });
    onClose();
  };

  const handleClose = () => {
    setName('');
    setCode('');
    setFaculty('');
    setCredits(0);
    setError('');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Course</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Course Name" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
          <input type="text" placeholder="Course Code" value={code} onChange={e => setCode(e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
          <input type="text" placeholder="Faculty" value={faculty} onChange={e => setFaculty(e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
          <input type="number" placeholder="Credits" value={credits} onChange={e => setCredits(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" required min="1" />
          {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={handleClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;
