import React from 'react';
import {
  BookOpen,
  Calculator,
  Target,
  Award,
  CheckCircle,
  ArrowRight,
  Play,
  Users,
  TrendingUp,
} from 'lucide-react';

export const TutorialPage: React.FC = () => {
  const steps = [
    {
      icon: Users,
      title: 'Enter Student Information',
      description:
        'Fill in your name, USN (University Seat Number), and current semester.',
      details: [
        'Your name will appear on exported reports',
        'USN helps identify your academic record',
        'Semester selection affects grade calculations',
      ],
    },
    {
      icon: BookOpen,
      title: 'Add Your Subjects',
      description:
        'Add all subjects for your current semester with their credits and internal marks.',
      details: [
        'Subject names should match your official curriculum',
        'Credits typically range from 1-6 per subject',
        'Internal marks are out of 50 (CIE marks)',
        'You can add multiple subjects using the "Add Subject" button',
      ],
    },
    {
      icon: Target,
      title: 'Set Grade Expectations',
      description:
        'Choose your target grade for each subject to see required external marks.',
      details: [
        'Select from O, A+, A, B+, B, C, or P grades',
        'The system calculates minimum external marks needed',
        'Red indicators show impossible grade targets',
        'Leave blank for minimum passing calculations',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Include Previous Semesters (Optional)',
      description:
        'Add previous semester data to calculate your cumulative CGPA.',
      details: [
        'Toggle "Include Previous Semesters" to enable',
        'Enter SGPA and credits for each completed semester',
        'This helps track your overall academic progress',
        'CGPA calculation includes all semesters',
      ],
    },
    {
      icon: Calculator,
      title: 'Calculate Results',
      description:
        'Click "Calculate Results" to see your SGPA, CGPA, and detailed subject analysis.',
      details: [
        'SGPA is calculated for the current semester',
        'CGPA includes all previous semesters if added',
        'Subject-wise grades are shown with explanations',
        'Results are automatically saved to database',
      ],
    },
    {
      icon: Award,
      title: 'Export and Share',
      description: 'Export your results as a professional PDF report.',
      details: [
        'PDF includes all student and subject details',
        'Professional formatting suitable for records',
        'Includes calculation methodology notes',
        'Can be shared with advisors or for applications',
      ],
    },
  ];

  const gradeScale = [
    { grade: 'O', points: 10, range: '90-100%', level: 'Outstanding' },
    { grade: 'A+', points: 9, range: '80-89%', level: 'Excellent' },
    { grade: 'A', points: 8, range: '70-79%', level: 'Very Good' },
    { grade: 'B+', points: 7, range: '60-69%', level: 'Good' },
    { grade: 'B', points: 6, range: '55-59%', level: 'Above Average' },
    { grade: 'C', points: 5, range: '50-54%', level: 'Average' },
    { grade: 'P', points: 4, range: '40-49%', level: 'Pass' },
    { grade: 'F', points: 0, range: '0-39%', level: 'Fail' },
  ];

  const tips = [
    {
      title: 'Accurate Internal Marks',
      description:
        'Enter your exact CIE (Continuous Internal Evaluation) marks for precise calculations.',
    },
    {
      title: 'Realistic Grade Targets',
      description:
        'Set achievable grade targets based on your internal marks and study preparation.',
    },
    {
      title: 'Regular Updates',
      description:
        'Update your calculations as you receive more internal assessment results.',
    },
    {
      title: 'Previous Semester Data',
      description:
        'Include all previous semesters for accurate CGPA tracking and academic planning.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-12 shadow-2xl">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="mr-4 animate-pulse" size={48} />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Tutorial
            </h1>
          </div>
          <p className="text-lg md:text-xl opacity-90 font-light max-w-2xl mx-auto">
            Learn how to use Grade Calculator effectively to calculate your SGPA
            and CGPA with precision
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Quick Start */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12 border border-blue-100 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl mr-4">
              <Play className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Quick Start Guide
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Enter Details
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Fill in your student information and subjects
              </p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Set Targets
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Choose your desired grades for each subject
              </p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Calculate
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get your SGPA, CGPA, and detailed analysis
              </p>
            </div>
          </div>
        </div>

        {/* Step-by-Step Guide */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
            Step-by-Step Guide
          </h2>
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {step.description}
                      </p>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="flex items-start space-x-3"
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Grade Scale */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12 border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center">
            <Award className="mr-3 text-yellow-600 dark:text-yellow-400" />
            Grade Scale Reference
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-600">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    Grade
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    Points
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    Percentage Range
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                    Level
                  </th>
                </tr>
              </thead>
              <tbody>
                {gradeScale.map((grade, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                          grade.grade === 'O'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                            : grade.grade === 'A+'
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                            : grade.grade === 'A'
                            ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300'
                            : grade.grade === 'B+'
                            ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                            : grade.grade === 'B'
                            ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300'
                            : grade.grade === 'C'
                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                            : grade.grade === 'P'
                            ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                        }`}
                      >
                        {grade.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-semibold text-gray-900 dark:text-gray-100">
                      {grade.points}
                    </td>
                    <td className="py-3 px-4 text-center text-gray-700 dark:text-gray-300">
                      {grade.range}
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                      {grade.level}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tips and Best Practices */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center">
            <Target className="mr-3 text-blue-600 dark:text-blue-400" />
            Tips and Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700"
              >
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
                  {tip.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
