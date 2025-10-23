
import React, { useState } from 'react';
// FIX: Added .ts extension to the import path.
import type { IssuedBook } from '../types.ts';

interface ReturnBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  books: IssuedBook[];
  onReturn: (bookIds: string[]) => void;
}

const ReturnBookModal: React.FC<ReturnBookModalProps> = ({ isOpen, onClose, books, onReturn }) => {
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);

  const handleToggleBook = (bookId: string) => {
    setSelectedBooks(prev =>
      prev.includes(bookId)
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const handleSubmit = () => {
    if (selectedBooks.length > 0) {
      onReturn(selectedBooks);
      setSelectedBooks([]); // Reset for next time
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Return Books</h2>
        <p className="text-gray-600 mb-6">Select the book(s) you wish to return.</p>
        
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
          {books.length > 0 ? books.map(book => (
            <div
              key={book.id}
              onClick={() => handleToggleBook(book.id)}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                selectedBooks.includes(book.id) ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-200' : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{book.title}</p>
                <p className="text-sm text-gray-500">{book.author}</p>
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${selectedBooks.includes(book.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                {selectedBooks.includes(book.id) && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path></svg>
                )}
              </div>
            </div>
          )) : (
            <p className="text-center text-gray-500 py-8">You have no books to return.</p>
          )}
        </div>
        
        <div className="flex justify-end space-x-4 pt-6 mt-6 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={selectedBooks.length === 0}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Confirm Return ({selectedBooks.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReturnBookModal;