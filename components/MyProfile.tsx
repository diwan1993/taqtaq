
import React from 'react';
// FIX: Added .ts extension to the import path.
import type { Student } from '../types.ts';

interface MyProfileProps {
    student: Student;
}

const ProfileField: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
    <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-lg text-gray-800">{value || 'N/A'}</p>
    </div>
);


const MyProfile: React.FC<MyProfileProps> = ({ student }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md text-center flex flex-col items-center">
                <img 
                    src={student.profilePictureUrl} 
                    alt={student.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 mb-4"
                />
                <h2 className="text-2xl font-bold text-gray-800">{student.name}</h2>
                <p className="text-gray-600">{student.program}</p>
                <p className="mt-2 text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">{student.id}</p>
            </div>
            <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-6">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProfileField label="Email Address" value={student.email} />
                    <ProfileField label="Phone Number" value={student.phone} />
                    <ProfileField label="Date of Birth" value={student.dob ? new Date(student.dob).toLocaleDateString() : ''} />
                    <ProfileField label="Address" value={student.address} />
                </div>
            </div>
             <div className="lg:col-span-3 bg-white p-8 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800">Your Unique QR Code</h3>
                    <p className="text-gray-600 mt-2">Use this code for attendance, library services, and access to campus facilities. You can scan this directly from your phone.</p>
                </div>
                <div className="p-4 bg-gray-50 border rounded-lg">
                   {student.qrCodeUrl ? (
                        <img src={student.qrCodeUrl} alt="Student QR Code" className="w-48 h-48" />
                   ) : (
                        <div className="w-48 h-48 flex items-center justify-center text-gray-500">QR Code not available.</div>
                   )}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;