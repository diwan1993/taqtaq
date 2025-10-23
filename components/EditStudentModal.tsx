import React, { useState, useEffect } from 'react';
import type { Student } from '../types.ts';

interface EditStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentToEdit: Student | null;
  onUpdateStudent: (student: Student) => void;
}

const EditStudentModal: React.FC<EditStudentModalProps> = ({ isOpen, onClose, studentToEdit, onUpdateStudent }) => {
  const [formData, setFormData] = useState<Student | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (studentToEdit) {
      setFormData(studentToEdit);
    }
  }, [studentToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && formData) {
        const reader = new FileReader();
        reader.onload = (event) => {
            setFormData({
                ...formData,
                profilePictureUrl: event.target?.result as string
            });
        };
        reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || !formData.name || !formData.email || !formData.program) {
      setError('Name, email, and program are required.');
      return;
    }
    setError('');
    onUpdateStudent(formData);
    onClose();
  };
  
  const handleClose = () => {
      setError('');
      onClose();
  };

  if (!isOpen || !formData) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Student Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                {formData.profilePictureUrl ? (
                    <img src={formData.profilePictureUrl} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : (
                    <span className="text-gray-500">Photo</span>
                )}
            </div>
            <input type="file" onChange={handleFileChange} accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
          </div>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
          <input type="text" name="program" placeholder="Program" value={formData.program} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
          <div className="grid grid-cols-2 gap-4">
            <input type="number" name="academicYear" placeholder="Academic Year" value={formData.academicYear} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required min="1" />
            <input type="number" name="semester" placeholder="Semester" value={formData.semester} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required min="1" />
          </div>
          {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={handleClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudentModal;