import React, { useState } from 'react';
import type { Student } from '../types.ts';
import AddStudentModal from './AddStudentModal.tsx';
import EditStudentModal from './EditStudentModal.tsx';
import ConfirmationModal from './ConfirmationModal.tsx';

interface StudentManagementProps {
    students: Student[];
    onAddStudent: (student: Omit<Student, 'id' | 'qrCodeUrl' | 'profilePictureUrl'>) => void;
    onUpdateStudent: (student: Student) => void;
    onRemoveStudent: (studentId: string) => void;
}

const StudentManagement: React.FC<StudentManagementProps> = ({ students, onAddStudent, onUpdateStudent, onRemoveStudent }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const handleEditClick = (student: Student) => {
        setSelectedStudent(student);
        setIsEditModalOpen(true);
    };
    
    const handleDeleteClick = (student: Student) => {
        setSelectedStudent(student);
        setIsDeleteModalOpen(true);
    };
    
    const confirmDelete = () => {
        if (selectedStudent) {
            onRemoveStudent(selectedStudent.id);
        }
        setIsDeleteModalOpen(false);
        setSelectedStudent(null);
    };
    
    return (
        <>
            <div className="space-y-6">
                 <div className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Student Management</h2>
                        <p className="mt-1 text-gray-600">Add, edit, or remove student records.</p>
                    </div>
                    <button onClick={() => setIsAddModalOpen(true)} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600">
                        Add Student
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {students.map(student => (
                        <div key={student.id} className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-200">
                            <div className="flex items-center space-x-4 mb-4">
                                <img 
                                    src={student.profilePictureUrl || `https://i.pravatar.cc/150?u=${student.id}`} 
                                    alt={student.name} 
                                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-lg text-gray-800 truncate">{student.name}</h3>
                                    <p className="text-sm text-gray-600 truncate">{student.program}</p>
                                    <p className="text-xs text-gray-500 break-all">{student.email || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 pt-3 flex justify-end space-x-2">
                                <button 
                                    onClick={() => handleEditClick(student)} 
                                    className="text-sm font-semibold text-blue-600 hover:text-blue-800 py-1 px-3 rounded-md hover:bg-blue-50 transition-colors duration-200"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDeleteClick(student)} 
                                    className="text-sm font-semibold text-red-600 hover:text-red-800 py-1 px-3 rounded-md hover:bg-red-50 transition-colors duration-200"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <AddStudentModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
                onAddStudent={onAddStudent} 
            />
            <EditStudentModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
                studentToEdit={selectedStudent}
                onUpdateStudent={onUpdateStudent}
            />
            <ConfirmationModal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Student"
                message={`Are you sure you want to delete the record for ${selectedStudent?.name}? This action cannot be undone.`}
            />
        </>
    );
};

export default StudentManagement;