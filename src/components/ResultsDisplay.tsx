import React from 'react';
import { Trophy, Download, FileText, Target, Star } from 'lucide-react';
import { CalculationResult, Student, PreviousSemester } from '../types';
import { GRADE_SCALE } from '../utils/gradeCalculations';
import { exportToPDF } from '../utils/exportUtils';

interface ResultsDisplayProps {
  result: CalculationResult;
  student: Student;
  previousSemesters: PreviousSemester[];
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  result,
  student,
  previousSemesters,
}) => {
  const handleExportPDF = () => {
    exportToPDF(student, result, previousSemesters);
  };

  const getSGPALevel = (sgpa: number) => {
    if (sgpa >= 9.0)
      return {
        level: 'Outstanding',
        color: 'text-green-600 dark:text-green-400',
        bg: 'bg-green-50 dark:bg-green-900/20',
      };
    if (sgpa >= 8.0)
      return {
        level: 'Excellent',
        color: 'text-blue-600 dark:text-blue-400',
        bg: 'bg-blue-50 dark:bg-blue-900/20',
      };
    if (sgpa >= 7.0)
      return {
        level: 'Very Good',
        color: 'text-indigo-600 dark:text-indigo-400',
        bg: 'bg-indigo-50 dark:bg-indigo-900/20',
      };
    if (sgpa >= 6.0)
      return {
        level: 'Good',
        color: 'text-purple-600 dark:text-purple-400',
        bg: 'bg-purple-50 dark:bg-purple-900/20',
      };
    if (sgpa >= 5.0)
      return {
        level: 'Average',
        color: 'text-yellow-600 dark:text-yellow-400',
        bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      };
    return {
      level: 'Below Average',
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-900/20',
    };
  };

  const sgpaInfo = getSGPALevel(result.sgpa);
  const cgpaInfo = result.cgpa ? getSGPALevel(result.cgpa) : null;

  // Check if there are any 1 credit subjects
  const hasOneCreditSubjects = result.subjects.some(
    (subject) => subject.credits === 1
  );
  const hasMultiCreditSubjects = result.subjects.some(
    (subject) => subject.credits > 1
  );

  return (
    <div className="space-y-8">
      {/* Summary Cards - Keep existing code */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className={`${sgpaInfo.bg} rounded-2xl p-6 border-2 border-opacity-20 border-current transform hover:scale-105 transition-all duration-300 shadow-lg dark:shadow-gray-800`}
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`p-3 rounded-full ${sgpaInfo.color
                .replace('text-', 'bg-')
                .replace('-600', '-100')
                .replace('dark:text-', 'dark:bg-')
                .replace('-400', '-900/30')}`}
            >
              <Target className={`${sgpaInfo.color}`} size={24} />
            </div>
            <span
              className={`text-sm font-semibold ${sgpaInfo.color} px-3 py-1 rounded-full bg-white dark:bg-gray-800 bg-opacity-80`}
            >
              {sgpaInfo.level}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Current SGPA
          </h3>
          <p className={`text-3xl font-bold ${sgpaInfo.color}`}>
            {result.sgpa.toFixed(2)}
          </p>
        </div>

        {result.cgpa && (
          <div
            className={`${
              cgpaInfo!.bg
            } rounded-2xl p-6 border-2 border-opacity-20 border-current transform hover:scale-105 transition-all duration-300 shadow-lg dark:shadow-gray-800`}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-full ${cgpaInfo!.color
                  .replace('text-', 'bg-')
                  .replace('-600', '-100')
                  .replace('dark:text-', 'dark:bg-')
                  .replace('-400', '-900/30')}`}
              >
                <Trophy className={`${cgpaInfo!.color}`} size={24} />
              </div>
              <span
                className={`text-sm font-semibold ${
                  cgpaInfo!.color
                } px-3 py-1 rounded-full bg-white dark:bg-gray-800 bg-opacity-80`}
              >
                {cgpaInfo!.level}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Cumulative CGPA
            </h3>
            <p className={`text-3xl font-bold ${cgpaInfo!.color}`}>
              {result.cgpa.toFixed(2)}
            </p>
          </div>
        )}

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6 border-2 border-indigo-200 dark:border-indigo-700 border-opacity-30 transform hover:scale-105 transition-all duration-300 shadow-lg dark:shadow-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
              <Star
                className="text-indigo-600 dark:text-indigo-400"
                size={24}
              />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Total Credits
          </h3>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            {result.totalCredits}
          </p>
        </div>
      </div>

      {/* Subjects Table - MODIFIED */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <h3 className="text-xl font-bold text-white flex items-center">
            <Trophy className="mr-3" size={24} />
            Subject-wise Results (Based on Minimum Pass Requirements)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Subject
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Credits
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Internal
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Est. External
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Total %
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Grade
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Points
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {result.subjects.map((subject, index) => {
                const maxExternalMarks = subject.credits === 1 ? 50 : 100;
                const minPassMarks = subject.credits === 1 ? 17.5 : 35;

                return (
                  <tr
                    key={subject.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                      {subject.name}
                      {subject.credits === 1 && (
                        <span className="ml-2 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                          1 Credit
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-gray-700 dark:text-gray-300">
                      {subject.credits}
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-gray-700 dark:text-gray-300">
                      {subject.internalMarks}/50
                    </td>
                    <td className="px-6 py-4 text-sm text-center text-gray-700 dark:text-gray-300">
                      {subject.estimatedExternalMarks?.toFixed(1)}/
                      {subject.credits === 1 ? '50' : '100'}
                    </td>

                    <td className="px-6 py-4 text-sm text-center text-gray-700 dark:text-gray-300">
                      {subject.totalMarks?.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                          subject.grade === 'O'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                            : subject.grade === 'A+'
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                            : subject.grade === 'A'
                            ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300'
                            : subject.grade === 'B+'
                            ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                            : subject.grade === 'B'
                            ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300'
                            : subject.grade === 'C'
                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                            : subject.grade === 'P'
                            ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                        }`}
                      >
                        {subject.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-center font-semibold text-gray-900 dark:text-gray-100">
                      {subject.gradePoints}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* UPDATED NOTE SECTION */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4 text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <p>
            <strong>Note:</strong> Results are calculated assuming minimum
            external marks required to pass:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            {hasOneCreditSubjects && (
              <li>
                <strong>1 Credit Subjects:</strong> Minimum 17.5/50 marks in
                semester end exam
              </li>
            )}
            {hasMultiCreditSubjects && (
              <li>
                <strong>Multi-Credit Subjects:</strong> Minimum 35/100 marks in
                semester end exam
              </li>
            )}
          </ul>
          <p>
            Actual grades may vary based on actual semester end exam
            performance.
          </p>
        </div>
      </div>

      {/* Export Button - Keep existing code */}
      <div className="flex justify-center">
        <button
          onClick={handleExportPDF}
          className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-4 rounded-xl hover:from-red-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center font-semibold shadow-lg"
        >
          <FileText className="mr-3" size={20} />
          Export as PDF
        </button>
      </div>
    </div>
  );
};
