
import React, { useState } from 'react';
// FIX: Added .tsx extension to the import path.
import { COURSE_ATTENDANCE_DATA } from '../constants.tsx';
import QRCodeScannerModal from './QRCodeScannerModal.tsx';
// FIX: Added .ts extension to the import path.
import type { CourseAttendance } from '../types.ts';

const StatusBadge: React.FC<{ status: CourseAttendance['status'] }> = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full";
  let specificClasses = "";

  switch (status) {
    case 'Present':
      specificClasses = "bg-green-100 text-green-800";
      break;
    case 'Checked Out':
      specificClasses = "bg-blue-100 text-blue-800";
      break;
    case 'Absent':
    default:
      specificClasses = "bg-red-100 text-red-800";
      break;
  }
  return <span className={`${baseClasses} ${specificClasses}`}>{status}</span>;
};


const Attendance: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<CourseAttendance[]>(COURSE_ATTENDANCE_DATA);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const handleAttendanceAction = (action: string, data: any) => {
    if (action === 'check-in' || action === 'check-out') {
      const { courseId } = data;
       setAttendanceRecords(prevRecords => 
        prevRecords.map(record => {
          if (record.courseId === courseId) {
            return { ...record, status: action === 'check-in' ? 'Present' : 'Checked Out' };
          }
          return record;
        })
      );
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Class Attendance Status</h2>
            <p className="text-gray-600">Scan the QR code in your classroom to check-in or check-out.</p>
          </div>
          <button 
            onClick={() => setIsScannerOpen(true)}
            className="flex items-center space-x-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6.5 6.5v-2.25L11 15.5l-2 2L11 19.5l1.5-1.5V20M4 12H3m1-6l.75.75M20 12h1M4 18l.75-.75m14.5.75l-.75-.75M12 20a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <span>Scan QR Code</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {attendanceRecords.map((att) => (
            <div key={att.courseId} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
              <div>
                <h3 className="font-semibold text-gray-800">{att.courseName}</h3>
                <p className="text-sm text-gray-500">{att.courseCode}</p>
              </div>
              <StatusBadge status={att.status} />
            </div>
          ))}
        </div>
      </div>
      <QRCodeScannerModal 
        isOpen={isScannerOpen} 
        onClose={() => setIsScannerOpen(false)}
        onAction={handleAttendanceAction}
        scanType="attendance"
      />
    </>
  );
};

export default Attendance;