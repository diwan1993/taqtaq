// FIX: Provided full content for constants.tsx with mock data.
import type { Student, Course, AttendanceSummary, UpcomingEvent, FeeDetails, Grade, IssuedBook, CourseAttendance, FeeTransaction, Staff } from './types.ts';

export const STUDENT_DATA: Student = {
  id: 'STU-0123',
  name: 'Alex Johnson',
  email: 'alex.j@example.com',
  password: 'password123',
  program: 'B.Sc. Nursing',
  academicYear: 2,
  semester: 4,
  profilePictureUrl: 'https://i.pravatar.cc/150?u=alexjohnson',
  phone: '555-123-4567',
  dob: '2003-05-15',
  address: '123 University Lane, College Town, USA',
  qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=STU-0123'
};

export const ADMIN_USER: Staff = {
  id: 'ADMIN-001',
  name: 'Diwan Palany',
  email: 'diwanpalany@gmail.com',
  password: 'diwan1993',
  role: 'Admin',
  department: 'Administration',
  profilePictureUrl: 'https://i.pravatar.cc/150?u=diwanpalany'
};

export const ACADEMIC_STAFF_USER: Staff = {
  id: 'STAFF-001',
  name: 'Prof. Robert Davis',
  email: 'staff@example.com',
  password: 'password123',
  role: 'Academic',
  department: 'Nursing',
  profilePictureUrl: 'https://i.pravatar.cc/150?u=robertdavis'
};

export const COURSES_DATA: Course[] = [
  { id: 'C1', code: 'NRS201', name: 'Advanced Nursing Practices', faculty: 'Dr. Smith', credits: 4, progress: 75 },
  { id: 'C2', code: 'MLT105', name: 'Clinical Hematology', faculty: 'Prof. Davis', credits: 3, progress: 60 },
  { id: 'C3', code: 'BUS303', name: 'Business Ethics', faculty: 'Ms. Chen', credits: 3, progress: 85 },
  { id: 'C4', code: 'NRS202', name: 'Pediatric Care', faculty: 'Dr. Wilson', credits: 4, progress: 45 },
];

export const ATTENDANCE_SUMMARY_DATA: AttendanceSummary = {
  present: 78,
  absent: 7,
  total: 85,
};

export const UPCOMING_EVENTS_DATA: UpcomingEvent[] = [
  { id: 'E1', title: 'Mid-term Exam: NRS201', time: '10:00 AM', location: 'Hall A', type: 'exam' },
  { id: 'E2', title: 'Guest Lecture: Future of Healthcare', time: '02:00 PM', location: 'Auditorium', type: 'event' },
  { id: 'E3', title: 'Clinical Hematology Lab', time: '09:00 AM', location: 'Lab 3', type: 'class' },
];

export const FEE_DATA: FeeDetails = {
  total: 5500,
  paid: 4000,
  due: 1500,
  dueDate: '2024-09-01',
};

export const FEE_TRANSACTION_DATA: FeeTransaction[] = [
    { id: 'T1', date: '2024-07-20', description: 'Semester Fee', amount: 4000, type: 'credit'},
    { id: 'T2', date: '2024-07-15', description: 'Library Fine', amount: 25, type: 'debit'},
];

export const GRADES_DATA: Grade[] = [
  { id: 'G1', courseCode: 'NRS101', courseName: 'Fundamentals of Nursing', credits: 4, grade: 'A' },
  { id: 'G2', courseCode: 'BIO101', courseName: 'Anatomy & Physiology', credits: 4, grade: 'B' },
  { id: 'G3', courseCode: 'ENG101', courseName: 'English Composition', credits: 3, grade: 'A' },
  { id: 'G4', courseCode: 'PSY101', courseName: 'Introduction to Psychology', credits: 3, grade: 'C' },
];

export const COURSE_ATTENDANCE_DATA: CourseAttendance[] = [
  { courseId: 'C1', courseName: 'Advanced Nursing Practices', courseCode: 'NRS201', status: 'Present' },
  { courseId: 'C2', courseName: 'Clinical Hematology', courseCode: 'MLT105', status: 'Absent' },
  { courseId: 'C3', courseName: 'Business Ethics', courseCode: 'BUS303', status: 'Checked Out' },
];

export const ISSUED_BOOKS_DATA: IssuedBook[] = [
  { id: 'BK-1', title: 'The Nursing Process', author: 'Jane Doe', issueDate: '2024-07-01', dueDate: '2024-07-15' },
  { id: 'BK-2', title: 'Clinical Diagnosis', author: 'John Smith', issueDate: '2024-07-05', dueDate: '2024-07-25' },
];

export const STUDENTS_DATA_MANAGEMENT: Student[] = [
    { ...STUDENT_DATA },
    { id: 'STU-0124', name: 'Maria Garcia', email: 'maria.g@example.com', password: 'password123', program: 'B.Sc. MLT', academicYear: 1, semester: 2, profilePictureUrl: 'https://i.pravatar.cc/150?u=mariagarcia' },
    { id: 'STU-0125', name: 'Chen Wei', email: 'chen.w@example.com', password: 'password123', program: 'Business Admin', academicYear: 3, semester: 6, profilePictureUrl: 'https://i.pravatar.cc/150?u=chenwei' },
];

export const STAFF_DATA_MANAGEMENT: Staff[] = [
    ADMIN_USER,
    ACADEMIC_STAFF_USER,
    { id: 'STAFF-002', name: 'Dr. Emily Carter', email: 'emily.c@example.com', password: 'password123', role: 'Academic', department: 'MLT', profilePictureUrl: 'https://i.pravatar.cc/150?u=emilycarter' },
    { id: 'STAFF-003', name: 'Mr. David Lee', email: 'david.l@example.com', password: 'password123', role: 'Non-Academic', department: 'Library', profilePictureUrl: 'https://i.pravatar.cc/150?u=davidlee' },
];