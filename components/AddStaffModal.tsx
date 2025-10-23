// FIX: Provided full implementation for AddStaffModal component.
import React, { useState } from 'react';
import type { Staff } from '../types.ts';

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStaff: (staff: Omit<Staff, 'id'>) => void;
}

const AddStaffModal: React.FC<AddStaffModalProps> = ({ isOpen, onClose, onAddStaff }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'Admin' | 'Academic' | 'Non-Academic'>('Academic');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !department) {
      setError('All fields are required.');
      return;
    }
    setError('');
    onAddStaff({ name, email, password, role, department });
    onClose();
  };

  const handleClose = () => {
    setName('');
    setEmail('');
    setPassword('');
    setRole('Academic');
    setDepartment('');
    setError('');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Staff Member</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
          <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
          <input type="text" placeholder="Department" value={department} onChange={e => setDepartment(e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <select
                id="role"
                value={role}
                onChange={e => setRole(e.target.value as 'Admin' | 'Academic' | 'Non-Academic')}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
                <option>Academic</option>
                <option>Admin</option>
                <option>Non-Academic</option>
            </select>
          </div>
          {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={handleClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Add Staff
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaffModal;
