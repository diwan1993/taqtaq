// FIX: Provided full implementation for EditStaffModal component.
import React, { useState, useEffect } from 'react';
import type { Staff } from '../types.ts';

interface EditStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  staffToEdit: Staff | null;
  onUpdateStaff: (staff: Staff) => void;
}

const EditStaffModal: React.FC<EditStaffModalProps> = ({ isOpen, onClose, staffToEdit, onUpdateStaff }) => {
  const [formData, setFormData] = useState<Staff | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (staffToEdit) {
      setFormData(staffToEdit);
    }
  }, [staffToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (formData) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || !formData.name || !formData.email || !formData.department) {
      setError('Name, email, and department are required.');
      return;
    }
    setError('');
    onUpdateStaff(formData);
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Staff Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
          <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
          <div>
            <label htmlFor="edit-role" className="block text-sm font-medium text-gray-700">Role</label>
            <select
                id="edit-role"
                name="role"
                value={formData.role}
                onChange={handleChange}
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStaffModal;
