import React from 'react';
import { User, Hash, Calendar } from 'lucide-react';
import { Student } from '../types';

interface StudentInfoProps {
  student: Student;
  setStudent: React.Dispatch<React.SetStateAction<Student>>;
}

export const StudentInfo: React.FC<StudentInfoProps> = ({ student, setStudent }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 transform hover:scale-105 transition-all duration-300 border border-blue-100 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center">
        <User className="mr-3 text-blue-600 dark:text-blue-400" size={28} />
        Student Information
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Student Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
            <input
              type="text"
              value={student.name}
              onChange={(e) => setStudent(prev => ({ ...prev, name: e.target.value }))}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100"
              placeholder="Enter your full name"
            />
          </div>
        </div>
        
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            USN
          </label>
          <div className="relative">
            <Hash className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
            <input
              type="text"
              value={student.usn}
              onChange={(e) => setStudent(prev => ({ ...prev, usn: e.target.value.toUpperCase() }))}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-gray-100"
              placeholder="e.g., 1XX20XX001"
            />
          </div>
        </div>
        
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Semester
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
            <select
              value={student.semester}
              onChange={(e) => setStudent(prev => ({ ...prev, semester: parseInt(e.target.value) }))}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 appearance-none cursor-pointer text-gray-900 dark:text-gray-100"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};