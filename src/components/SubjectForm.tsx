import React from 'react';
import { Plus, Trash2, Book, Award, Target } from 'lucide-react';
import { Subject, Grade } from '../types';
import {
  calculateRequiredMarks,
  GRADE_SCALE,
} from '../utils/gradeCalculations';

interface SubjectFormProps {
  subjects: Subject[];
  setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
}

export const SubjectForm: React.FC<SubjectFormProps> = ({
  subjects,
  setSubjects,
}) => {
  const addSubject = () => {
    const newSubject: Subject = {
      id: Date.now().toString(),
      name: '',
      credits: 3,
      internalMarks: 0,
    };
    setSubjects((prev) => [...prev, newSubject]);
  };

  const updateSubject = (id: string, field: keyof Subject, value: any) => {
    setSubjects((prev) =>
      prev.map((subject) =>
        subject.id === id ? { ...subject, [field]: value } : subject
      )
    );
  };

  const removeSubject = (id: string) => {
    setSubjects((prev) => prev.filter((subject) => subject.id !== id));
  };

  const gradeOptions: Grade[] = ['O', 'A+', 'A', 'B+', 'B', 'C', 'P'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-blue-100 dark:border-gray-700">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
          <Book className="mr-3 text-blue-600 dark:text-blue-400" size={28} />
          Subjects
        </h2>
      </div>

      <div className="space-y-6">
        {subjects.map((subject, index) => {
          const requiredMarks = calculateRequiredMarks(
            subject.internalMarks,
            subject.credits
          );

          // Debug logging
          console.log('Subject:', subject.name, 'Required Marks:', requiredMarks);

          return (
            <div
              key={subject.id}
              className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                  <Award
                    className="mr-2 text-blue-600 dark:text-blue-400"
                    size={20}
                  />
                  Subject {index + 1}
                </h3>
                {subjects.length > 1 && (
                  <button
                    onClick={() => removeSubject(subject.id)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Subject Name
                  </label>
                  <input
                    type="text"
                    value={subject.name}
                    onChange={(e) =>
                      updateSubject(subject.id, 'name', e.target.value)
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="e.g., Mathematics"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Credits
                  </label>
                  <select
                    value={subject.credits}
                    onChange={(e) =>
                      updateSubject(
                        subject.id,
                        'credits',
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    {[1, 2, 3, 4, 5, 6].map((credit) => (
                      <option key={credit} value={credit}>
                        {credit}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Internal Marks (out of 50)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={subject.internalMarks}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      const clampedValue = Math.min(50, Math.max(0, value));
                      updateSubject(subject.id, 'internalMarks', clampedValue);
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                  {subject.internalMarks > 50 && (
                    <p className="text-red-500 text-xs mt-1">
                      Internal marks cannot exceed 50
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Expected Grade
                  </label>
                  <select
                    value={subject.selectedGrade || ''}
                    onChange={(e) =>
                      updateSubject(
                        subject.id,
                        'selectedGrade',
                        (e.target.value as Grade) || undefined
                      )
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="">Select Grade (Optional)</option>
                    {gradeOptions.map((grade) => {
                      const maxMarks = subject.credits === 1 ? 50 : 100;
                      const isImpossible = requiredMarks[grade] > maxMarks;
                      
                      // Debug each option
                      console.log(`Grade ${grade}: Required=${requiredMarks[grade]}, Max=${maxMarks}, Impossible=${isImpossible}`);
                      
                      return (
                        <option
                          key={grade}
                          value={grade}
                          disabled={isImpossible}
                          style={{ 
                            color: isImpossible ? '#ef4444' : 'inherit',
                            backgroundColor: isImpossible ? '#fef2f2' : 'inherit'
                          }}
                        >
                          {grade} - {GRADE_SCALE[grade]?.level || 'Unknown'}{' '}
                          {isImpossible ? '(Not Possible)' : ''}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              {subject.internalMarks > 0 && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-4 flex items-center">
                    <Target className="mr-2" size={18} />
                    Required Semester End Marks (out of{' '}
                    {subject.credits === 1 ? '50' : '100'})
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 text-sm">
                    {Object.entries(requiredMarks).map(([grade, marks]) => {
                      const maxMarks = subject.credits === 1 ? 50 : 100;
                      const isImpossible = marks > maxMarks;
                      const isSelected = subject.selectedGrade === grade;
                      
                      return (
                        <div
                          key={grade}
                          className={`text-center p-3 rounded-lg border-2 transition-all duration-300 ${
                            isSelected
                              ? 'bg-green-100 dark:bg-green-900/30 border-green-400 dark:border-green-600 text-green-800 dark:text-green-300 ring-2 ring-green-300 dark:ring-green-600'
                              : isImpossible
                              ? 'bg-red-100 dark:bg-red-900/50 border-red-300 dark:border-red-600 text-red-800 dark:text-red-300 opacity-75'
                              : 'bg-white dark:bg-gray-700 border-blue-200 dark:border-blue-600 text-blue-800 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                          }`}
                          title={isImpossible ? `Cannot achieve ${grade} grade with ${subject.internalMarks} internal marks` : ''}
                        >
                          <div className="font-bold text-lg">{grade}</div>
                          <div className="text-xs font-semibold">
                            {isImpossible ? (
                              <span className="font-bold text-red-700 dark:text-red-400 animate-pulse">
                                Not Possible
                              </span>
                            ) : (
                              `${Math.round(marks * 10) / 10}/${maxMarks}`
                            )}
                          </div>
                          {isSelected && (
                            <div className="text-xs text-green-600 dark:text-green-400 font-bold mt-1">
                              SELECTED
                            </div>
                          )}
                          {isImpossible && (
                            <div className="text-xs text-red-600 dark:text-red-400 font-bold mt-1">
                              ❌ IMPOSSIBLE
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 text-xs text-gray-600 dark:text-gray-400">
                    <p>
                      • Minimum {subject.credits === 1 ? '17.5/50' : '35/100'}{' '}
                      required in semester end exam to pass
                    </p>
                    <p>
                      •{' '}
                      {subject.credits === 1
                        ? 'For 1-credit subjects: Internal (50) + External (50) = Total (100), Grade based on total percentage'
                        : 'For multi-credit subjects: Internal (50) + External (100), but weighted equally for grade calculation'}
                    </p>
                    {subject.selectedGrade && (
                      <p className="text-green-700 dark:text-green-400 font-semibold">
                        • Selected Grade: {subject.selectedGrade} -{' '}
                        {GRADE_SCALE[subject.selectedGrade].level}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-4 flex justify-center">
                <button
                  onClick={addSubject}
                  className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-xl hover:from-green-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 flex items-center font-semibold shadow-lg text-sm"
                >
                  <Plus className="mr-2" size={16} />
                  Add Another Subject
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {subjects.length === 0 && (
        <div className="text-center py-12">
          <Book
            className="mx-auto text-gray-400 dark:text-gray-500 mb-4"
            size={48}
          />
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No subjects added yet. Click "Add Subject" to get started!
          </p>
          <button
            onClick={addSubject}
            className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 flex items-center font-semibold shadow-lg mx-auto"
          >
            <Plus className="mr-2" size={20} />
            Add First Subject
          </button>
        </div>
      )}
    </div>
  );
};
