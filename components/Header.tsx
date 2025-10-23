// FIX: Provided full implementation for the Header component.
import React from 'react';
import type { Student, Staff } from '../types.ts';

type User = Student | Staff;

interface HeaderProps {
    user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
    return (
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Welcome, {user.name.split(' ')[0]}!</h2>
                <p className="text-sm text-gray-500">Let's have a productive day.</p>
            </div>
            <div className="flex items-center space-x-4">
                <div className="text-right">
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <img 
                    src={user.profilePictureUrl} 
                    alt={user.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-300"
                />
            </div>
        </header>
    );
};

export default Header;
