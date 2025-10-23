
import React, { useState } from 'react';
// FIX: Added .tsx extension to the import path.
import { ISSUED_BOOKS_DATA } from '../constants.tsx';
import AddBookModal from './AddBookModal.tsx';
import ReturnBookModal from './ReturnBookModal.tsx';
import QRCodeScannerModal from './QRCodeScannerModal.tsx';
import EditBookModal from './EditBookModal.tsx';
// FIX: Added .ts extension to the import path.
import type { IssuedBook } from '../types.ts';

const Library: React.FC = () => {
  const [books, setBooks] = useState<IssuedBook[]>(ISSUED_BOOKS_DATA);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<IssuedBook | null>(null);

  const isOverdue = (dueDate: string) => {
    const due = new Date(dueDate);
    due.setHours(23, 59, 59, 999);
    return due < new Date();
  };

  const handleAddBook = (newBookData: { title: string; author: string; dueDate: string; }) => {
    const newBook: IssuedBook = {
      id: `BK-${Date.now()}`,
      issueDate: new Date().toISOString().split('T')[0],
      ...newBookData
    };
    setBooks(prevBooks => [newBook, ...prevBooks]);
    setIsAddModalOpen(false);
  };

  const handleReturnBooks = (bookIdsToReturn: string[]) => {
    setBooks(prevBooks => prevBooks.filter(book => !bookIdsToReturn.includes(book.id)));
    setIsReturnModalOpen(false);
  };
  
  const handleLibraryAction = (action: string) => {
    if (action === 'issue') {
      setIsAddModalOpen(true);
    } else if (action === 'return') {
      setIsReturnModalOpen(true);
    }
  };
  
  const handleOpenEditModal = (book: IssuedBook) => {
    setEditingBook(book);
    setIsEditModalOpen(true);
  };

  const handleUpdateBook = (updatedBook: IssuedBook) => {
    setBooks(prevBooks => 
      prevBooks.map(book => (book.id === updatedBook.id ? updatedBook : book))
    );
    setIsEditModalOpen(false);
    setEditingBook(null);
  };


  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-start mb-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">My Issued Books</h2>
                <p className="text-gray-600">Manage your library books, check due dates, and renew items here.</p>
            </div>
            <div className="flex space-x-2">
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center space-x-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Issue Book</span>
                </button>
                 <button 
                    onClick={() => setIsScannerOpen(true)}
                    className="flex items-center space-x-2 bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6.5 6.5v-2.25L11 15.5l-2 2L11 19.5l1.5-1.5V20M4 12H3m1-6l.75.75M20 12h1M4 18l.75-.75m14.5.75l-.75-.75M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
                    <span>Scan at Library</span>
                  </button>
            </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {books.map((book) => (
                <tr key={book.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">{book.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{book.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(book.issueDate).toLocaleDateString()}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${isOverdue(book.dueDate) ? 'text-red-500' : 'text-gray-800'}`}>
                    {new Date(book.dueDate).toLocaleDateString()}
                    {isOverdue(book.dueDate) && <span className="ml-2 text-xs font-bold text-red-500 bg-red-100 px-2 py-1 rounded-full">OVERDUE</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button
                        onClick={() => handleOpenEditModal(book)}
                        className="text-blue-600 hover:text-blue-900 transition-colors duration-200 mr-4"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleReturnBooks([book.id])}
                        className="text-red-600 hover:text-red-900 transition-colors duration-200"
                    >
                        Return
                    </button>
                  </td>
                </tr>
              ))}
              {books.length === 0 && (
                <tr>
                    <td colSpan={5} className="text-center py-10 text-gray-500">
                        You have no books currently issued.
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <AddBookModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddBook={handleAddBook}
      />
      <ReturnBookModal
        isOpen={isReturnModalOpen}
        onClose={() => setIsReturnModalOpen(false)}
        books={books}
        onReturn={handleReturnBooks}
      />
      <QRCodeScannerModal 
        isOpen={isScannerOpen} 
        onClose={() => setIsScannerOpen(false)}
        onAction={handleLibraryAction}
        scanType="library"
      />
      <EditBookModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingBook(null);
        }}
        bookToEdit={editingBook}
        onUpdateBook={handleUpdateBook}
      />
    </>
  );
};

export default Library;