export interface Student {
  name: string;
  usn: string;
  semester: number;
}

export interface Subject {
  id: string;
  name: string;
  credits: number;
  internalMarks: number;
  selectedGrade?: Grade;
  totalMarks?: number;
  grade?: Grade;
  gradePoints?: number;
  estimatedExternalMarks?: number;
}

export interface PreviousSemester {
  semester: number;
  sgpa: number;
  credits: number;
}

export type Grade = 'O' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'P' | 'F';

export interface GradeInfo {
  points: number;
  minMarks: number;
  maxMarks: number;
  level: string;
}

export interface CalculationResult {
  sgpa: number;
  cgpa?: number;
  totalCredits: number;
  subjects: Subject[];
}

export interface StudentRecord {
  id?: string;
  student_name: string;
  usn: string;
  semester: number;
  subjects: Subject[];
  previous_semesters: PreviousSemester[];
  sgpa: number;
  cgpa?: number;
  total_credits: number;
  created_at?: string;
}