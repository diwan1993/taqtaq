// FIX: Provided full implementation for StaffManagement component.
import React, { useState } from 'react';
import type { Staff } from '../types.ts';
import AddStaffModal from './AddStaffModal.tsx';
import EditStaffModal from './EditStaffModal.tsx';
import ConfirmationModal from './ConfirmationModal.tsx';

interface StaffManagementProps {
    staff: Staff[];
    onAddStaff: (staff: Omit<Staff, 'id'>) => void;
    onUpdateStaff: (staff: Staff) => void;
    onRemoveStaff: (staffId: string) => void;
}

const StaffManagement: React.FC<StaffManagementProps> = ({ staff, onAddStaff, onUpdateStaff, onRemoveStaff }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

    const handleEditClick = (staffMember: Staff) => {
        setSelectedStaff(staffMember);
        setIsEditModalOpen(true);
    };
    
    const handleDeleteClick = (staffMember: Staff) => {
        setSelectedStaff(staffMember);
        setIsDeleteModalOpen(true);
    };
    
    const confirmDelete = () => {
        if (selectedStaff) {
            onRemoveStaff(selectedStaff.id);
        }
        setIsDeleteModalOpen(false);
        setSelectedStaff(null);
    };
    
    return (
        <>
            <div className="space-y-6">
                 <div className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Staff Management</h2>
                        <p className="mt-1 text-gray-600">Add, edit, or remove staff records.</p>
                    </div>
                    <button onClick={() => setIsAddModalOpen(true)} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600">
                        Add Staff
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {staff.map(staffMember => (
                         <div key={staffMember.id} className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-200">
                            <div className="flex items-center space-x-4 mb-4">
                                <img 
                                    src={staffMember.profilePictureUrl || `https://i.pravatar.cc/150?u=${staffMember.id}`} 
                                    alt={staffMember.name} 
                                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-lg text-gray-800 truncate">{staffMember.name}</h3>
                                    <p className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full inline-block mt-1">{staffMember.role}</p>
                                    <p className="text-sm text-gray-600 mt-1 truncate">{staffMember.department}</p>
                                    <p className="text-xs text-gray-500 break-all">{staffMember.email}</p>
                                </div>
                            </div>
                            <div className="border-t border-gray-200 pt-3 flex justify-end space-x-2">
                                <button 
                                    onClick={() => handleEditClick(staffMember)} 
                                    className="text-sm font-semibold text-blue-600 hover:text-blue-800 py-1 px-3 rounded-md hover:bg-blue-50 transition-colors duration-200"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDeleteClick(staffMember)} 
                                    className="text-sm font-semibold text-red-600 hover:text-red-800 py-1 px-3 rounded-md hover:bg-red-50 transition-colors duration-200"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <AddStaffModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
                onAddStaff={onAddStaff} 
            />
            <EditStaffModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
                staffToEdit={selectedStaff}
                onUpdateStaff={onUpdateStaff}
            />
            <ConfirmationModal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Staff Member"
                message={`Are you sure you want to delete the record for ${selectedStaff?.name}? This action cannot be undone.`}
            />
        </>
    );
};

export default StaffManagement;