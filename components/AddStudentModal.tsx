import React, { useState } from 'react';
import type { Student } from '../types.ts';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (student: Omit<Student, 'id' | 'qrCodeUrl'>) => void;
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({ isOpen, onClose, onAddStudent }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [program, setProgram] = useState('');
  const [academicYear, setAcademicYear] = useState(1);
  const [semester, setSemester] = useState(1);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (event) => {
            setProfilePictureUrl(event.target?.result as string);
        };
        reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !program) {
      setError('All fields are required.');
      return;
    }
    setError('');
    onAddStudent({ name, email, password, program, academicYear, semester, profilePictureUrl: profilePictureUrl ?? undefined });
    onClose();
  };

  const handleClose = () => {
    setName('');
    setEmail('');
    setPassword('');
    setProgram('');
    setAcademicYear(1);
    setSemester(1);
    setProfilePictureUrl(null);
    setError('');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Student</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
           <div className="flex items-center space-x-4">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                {profilePictureUrl ? (
                    <img src={profilePictureUrl} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : (
                    <span className="text-gray-500">Photo</span>
                )}
            </div>
            <input type="file" onChange={handleFileChange} accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
          </div>
          <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
          <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
          <input type="text" placeholder="Program" value={program} onChange={e => setProgram(e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Academic Year" value={academicYear} onChange={e => setAcademicYear(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" required min="1" />
            <input type="number" placeholder="Semester" value={semester} onChange={e => setSemester(Number(e.target.value))} className="w-full px-3 py-2 border rounded-md" required min="1" />
          </div>
          {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={handleClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;