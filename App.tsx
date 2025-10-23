import React, { useState } from 'react';
import Login from './components/Login.tsx';
import Sidebar from './components/Sidebar.tsx';
import Header from './components/Header.tsx';
import Dashboard from './components/Dashboard.tsx';
import Courses from './components/Courses.tsx';
import Grades from './components/Grades.tsx';
import Attendance from './components/Attendance.tsx';
import Fees from './components/Fees.tsx';
import Library from './components/Library.tsx';
import Settings from './components/Settings.tsx';
import MyProfile from './components/MyProfile.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import StudentManagement from './components/StudentManagement.tsx';
import StaffManagement from './components/StaffManagement.tsx';
import Departments from './components/Departments.tsx';
import AcademicDashboard from './components/AcademicDashboard.tsx';
import MyCoursesStaff from './components/MyCoursesStaff.tsx';
import MyStudentsStaff from './components/MyStudentsStaff.tsx';

import { 
    STUDENTS_DATA_MANAGEMENT,
    STAFF_DATA_MANAGEMENT,
    COURSES_DATA,
    ATTENDANCE_SUMMARY_DATA,
    UPCOMING_EVENTS_DATA
} from './constants.tsx';
import type { Student, Staff } from './types.ts';

type User = Student | Staff;

const App: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [view, setView] = useState('dashboard');
    
    // State for data management
    const [students, setStudents] = useState<Student[]>(STUDENTS_DATA_MANAGEMENT);
    const [staff, setStaff] = useState<Staff[]>(STAFF_DATA_MANAGEMENT);


    const handleLogin = (email: string, password: string, role: string): boolean => {
        if (role === 'Student') {
            const foundStudent = students.find(s => s.email === email && s.password === password);
            if (foundStudent) {
                setLoggedInUser(foundStudent);
                setView('dashboard');
                return true;
            }
        } else { // Admin or Academic Staff
            const staffRole = role === 'Academic Staff' ? 'Academic' : 'Admin';
            const foundStaff = staff.find(s => s.email === email && s.password === password && s.role === staffRole);

            if (foundStaff) {
                setLoggedInUser(foundStaff);
                if (foundStaff.role === 'Admin') {
                    setView('admin-dashboard');
                } else if (foundStaff.role === 'Academic') {
                    setView('academic-dashboard');
                }
                return true;
            }
        }
        return false;
    };


    const handleLogout = () => {
        setLoggedInUser(null);
        setView('dashboard');
    };
    
    // Admin functions
    const handleAddStudent = (student: Omit<Student, 'id' | 'qrCodeUrl'>) => {
        const newStudent: Student = {
            ...student,
            id: `STU-${Date.now()}`,
            qrCodeUrl: '/qr-code.png', // Placeholder
            profilePictureUrl: student.profilePictureUrl || 'https://i.pravatar.cc/150?u=new'
        };
        setStudents(prev => [...prev, newStudent]);
    };

    const handleUpdateStudent = (updatedStudent: Student) => {
        setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    };

    const handleRemoveStudent = (studentId: string) => {
        setStudents(prev => prev.filter(s => s.id !== studentId));
    };

    const handleAddStaff = (newStaff: Omit<Staff, 'id'>) => {
        const addedStaff: Staff = {
            ...newStaff,
            id: `STAFF-${Date.now()}`,
            profilePictureUrl: newStaff.profilePictureUrl || 'https://i.pravatar.cc/150?u=newstaff'
        };
        setStaff(prev => [...prev, addedStaff]);
    };

    const handleUpdateStaff = (updatedStaff: Staff) => {
        setStaff(prev => prev.map(s => s.id === updatedStaff.id ? updatedStaff : s));
    };

    const handleRemoveStaff = (staffId: string) => {
        setStaff(prev => prev.filter(s => s.id !== staffId));
    };


    const renderContent = () => {
        if (!loggedInUser) return null;

        const role = 'role' in loggedInUser ? loggedInUser.role : 'Student';

        if (role === 'Student') {
            const studentUser = loggedInUser as Student;
            switch (view) {
                case 'dashboard':
                    return <Dashboard student={studentUser} courses={COURSES_DATA} attendanceSummary={ATTENDANCE_SUMMARY_DATA} upcomingEvents={UPCOMING_EVENTS_DATA} />;
                case 'courses':
                    return <Courses />;
                case 'grades':
                    return <Grades />;
                case 'attendance':
                    return <Attendance />;
                case 'fees':
                    return <Fees />;
                case 'library':
                    return <Library />;
                case 'profile':
                    return <MyProfile student={studentUser} />;
                case 'settings':
                    return <Settings />;
                default:
                    return <Dashboard student={studentUser} courses={COURSES_DATA} attendanceSummary={ATTENDANCE_SUMMARY_DATA} upcomingEvents={UPCOMING_EVENTS_DATA} />;
            }
        }
        
        if (role === 'Admin') {
            switch(view) {
                case 'admin-dashboard':
                    return <AdminDashboard totalStudents={students.length} totalStaff={staff.length} />;
                case 'student-management':
                    return <StudentManagement students={students} onAddStudent={handleAddStudent} onUpdateStudent={handleUpdateStudent} onRemoveStudent={handleRemoveStudent} />;
                case 'staff-management':
                     return <StaffManagement staff={staff} onAddStaff={handleAddStaff} onUpdateStaff={handleUpdateStaff} onRemoveStaff={handleRemoveStaff} />;
                case 'departments':
                    return <Departments />;
                case 'settings':
                    return <Settings />;
                default:
                    return <AdminDashboard totalStudents={students.length} totalStaff={staff.length} />;
            }
        }
        
        if (role === 'Academic') {
             switch(view) {
                case 'academic-dashboard':
                    return <AcademicDashboard />;
                case 'my-courses':
                    return <MyCoursesStaff />;
                case 'my-students':
                    return <MyStudentsStaff />;
                case 'settings':
                    return <Settings />;
                default:
                    return <AcademicDashboard />;
            }
        }
    };

    if (!loggedInUser) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <Sidebar 
                userRole={'role' in loggedInUser ? loggedInUser.role : 'Student'} 
                activeView={view} 
                setView={setView} 
                onLogout={handleLogout} 
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header user={loggedInUser} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default App;
