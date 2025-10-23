// FIX: Provided full content for types.ts to define all data structures.

export interface Student {
  id: string;
  name: string;
  email: string;
  password: string;
  program: string;
  academicYear: number;
  semester: number;
  profilePictureUrl?: string;
  phone?: string;
  dob?: string;
  address?: string;
  qrCodeUrl?: string;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'Admin' | 'Academic' | 'Non-Academic';
  department: string;
  profilePictureUrl?: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  faculty: string;
  credits: number;
  progress: number;
}

export interface AttendanceSummary {
  present: number;
  absent: number;
  total: number;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  time: string;
  location: string;
  type: 'exam' | 'event' | 'class';
}

export interface FeeDetails {
  total: number;
  paid: number;
  due: number;
  dueDate: string;
}

export interface FeeTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
}

export interface Grade {
  id: string;
  courseCode: string;
  courseName: string;
  credits: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F' | 'IP'; // IP for In Progress
}

export interface CourseAttendance {
  courseId: string;
  courseName:string;
  courseCode: string;
  status: 'Present' | 'Absent' | 'Checked Out';
}

export interface IssuedBook {
  id: string;
  title: string;
  author: string;
  issueDate: string;
  dueDate: string;
}

export interface QRCodePayload {
  type: 'attendance' | 'library';
  courseId?: string;
  courseName?: string;
  location?: string;
}