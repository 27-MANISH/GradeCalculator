import { supabase } from '../lib/supabase';
import { StudentRecord, Student, Subject, PreviousSemester } from '../types';

export const saveStudentRecord = async (
  student: Student,
  subjects: Subject[],
  previousSemesters: PreviousSemester[],
  sgpa: number,
  cgpa?: number,
  totalCredits: number
): Promise<{ success: boolean; error?: string }> => {
  try {
    const record: Omit<StudentRecord, 'id' | 'created_at'> = {
      student_name: student.name,
      usn: student.usn,
      semester: student.semester,
      subjects: subjects,
      previous_semesters: previousSemesters,
      sgpa: sgpa,
      cgpa: cgpa,
      total_credits: totalCredits
    };

    const { error } = await supabase
      .from('student_records')
      .insert([record]);

    if (error) {
      console.error('Database error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Save error:', error);
    return { success: false, error: 'Failed to save data' };
  }
};

export const getStudentRecords = async (usn?: string): Promise<{ success: boolean; data?: StudentRecord[]; error?: string }> => {
  try {
    let query = supabase
      .from('student_records')
      .select('*')
      .order('created_at', { ascending: false });

    if (usn) {
      query = query.eq('usn', usn);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Fetch error:', error);
    return { success: false, error: 'Failed to fetch data' };
  }
};