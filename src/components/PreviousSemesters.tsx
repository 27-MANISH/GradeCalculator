import React from 'react';
import { Plus, Trash2, History } from 'lucide-react';
import { PreviousSemester } from '../types';

interface PreviousSemestersProps {
  previousSemesters: PreviousSemester[];
  setPreviousSemesters: React.Dispatch<
    React.SetStateAction<PreviousSemester[]>
  >;
  showPrevious: boolean;
  setShowPrevious: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PreviousSemesters: React.FC<PreviousSemestersProps> = ({
  previousSemesters,
  setPreviousSemesters,
  showPrevious,
  setShowPrevious,
}) => {
  const addPreviousSemester = () => {
    const newSemester: PreviousSemester = {
      semester: 1,
      sgpa: 0,
      credits: 0,
    };
    setPreviousSemesters((prev) => [...prev, newSemester]);
  };

  const updatePreviousSemester = (
    index: number,
    field: keyof PreviousSemester,
    value: number
  ) => {
    setPreviousSemesters((prev) =>
      prev.map((sem, i) => (i === index ? { ...sem, [field]: value } : sem))
    );
  };

  const removePreviousSemester = (index: number) => {
    setPreviousSemesters((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-purple-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
          <History
            className="mr-3 text-purple-600 dark:text-purple-400"
            size={28}
          />
          Previous Semesters (for CGPA)
        </h2>
        <div className="flex items-center space-x-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showPrevious}
              onChange={(e) => setShowPrevious(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                showPrevious ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  showPrevious ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </div>
            <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              Include Previous Semesters
            </span>
          </label>
          {showPrevious && (
            <button
              onClick={addPreviousSemester}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 flex items-center font-semibold shadow-lg"
            >
              <Plus className="mr-2" size={16} />
              Add Semester
            </button>
          )}
        </div>
      </div>

      {showPrevious && (
        <div className="space-y-4">
          {previousSemesters.map((semester, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Previous Semester {index + 1}
                </h3>
                <button
                  onClick={() => removePreviousSemester(index)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Semester Number
                  </label>
                  <select
                    value={semester.semester}
                    onChange={(e) =>
                      updatePreviousSemester(
                        index,
                        'semester',
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <option key={sem} value={sem}>
                        Semester {sem}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    SGPA
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.01"
                    value={semester.sgpa}
                    onChange={(e) =>
                      updatePreviousSemester(
                        index,
                        'sgpa',
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="e.g., 8.50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Credits
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={semester.credits}
                    onChange={(e) =>
                      updatePreviousSemester(
                        index,
                        'credits',
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="e.g., 22"
                  />
                </div>
              </div>
            </div>
          ))}

          {previousSemesters.length === 0 && (
            <div className="text-center py-8">
              <History
                className="mx-auto text-gray-400 dark:text-gray-500 mb-4"
                size={48}
              />
              <p className="text-gray-500 dark:text-gray-400">
                No previous semesters added. Add them to calculate CGPA!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
