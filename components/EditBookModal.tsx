
import React, { useState, useEffect } from 'react';
// FIX: Added .ts extension to the import path.
import type { IssuedBook } from '../types.ts';

interface EditBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookToEdit: IssuedBook | null;
  onUpdateBook: (book: IssuedBook) => void;
}

const EditBookModal: React.FC<EditBookModalProps> = ({ isOpen, onClose, bookToEdit, onUpdateBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.author);
      setDueDate(bookToEdit.dueDate);
      setError('');
    }
  }, [bookToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !dueDate) {
      setError('All fields are required.');
      return;
    }
    if (bookToEdit && new Date(dueDate) < new Date(bookToEdit.issueDate)) {
        setError('Due date cannot be before the issue date.');
        return;
    }
    setError('');
    if (bookToEdit) {
      onUpdateBook({ ...bookToEdit, title, author, dueDate });
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Book Details</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700">Book Title</label>
            <input
              type="text"
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="edit-author" className="block text-sm font-medium text-gray-700">Author</label>
            <input
              type="text"
              id="edit-author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="edit-dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              id="edit-dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
              min={bookToEdit ? bookToEdit.issueDate : new Date().toISOString().split("T")[0]}
            />
          </div>
          {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;