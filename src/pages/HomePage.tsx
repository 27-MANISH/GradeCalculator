import React, { useState } from 'react';
import { Calculator, GraduationCap, Save, AlertCircle } from 'lucide-react';
import { StudentInfo } from '../components/StudentInfo';
import { SubjectForm } from '../components/SubjectForm';
import { PreviousSemesters } from '../components/PreviousSemesters';
import { ResultsDisplay } from '../components/ResultsDisplay';
import { LoadingAnimation } from '../components/LoadingAnimation';
import {
  Student,
  Subject,
  PreviousSemester,
  CalculationResult,
} from '../types';
import {
  calculateSGPA,
  calculateCGPA,
  calculateSubjectGrade,
} from '../utils/gradeCalculations';
import { saveStudentRecord } from '../utils/database';

export const HomePage: React.FC = () => {
  const [student, setStudent] = useState<Student>({
    name: '',
    usn: '',
    semester: 1,
  });

  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: '1',
      name: '',
      credits: 3,
      internalMarks: 0,
    },
  ]);

  const [previousSemesters, setPreviousSemesters] = useState<
    PreviousSemester[]
  >([]);
  const [showPrevious, setShowPrevious] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [consentGiven, setConsentGiven] = useState(false);

  const calculateResults = async () => {
    if (!student.name || !student.usn || subjects.some((s) => !s.name)) {
      alert('Please fill in all required fields');
      return;
    }

    setIsCalculating(true);

    // Simulate calculation delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const processedSubjects = subjects.map(calculateSubjectGrade);
    const sgpa = calculateSGPA(subjects);
    const totalCredits = subjects.reduce(
      (sum, subject) => sum + subject.credits,
      0
    );

    let cgpa: number | undefined;
    if (showPrevious && previousSemesters.length > 0) {
      cgpa = calculateCGPA(sgpa, totalCredits, previousSemesters);
    }

    const calculationResult = {
      sgpa,
      cgpa,
      totalCredits,
      subjects: processedSubjects,
    };

    setResult(calculationResult);
    setIsCalculating(false);

    // Auto-save to database
    await saveToDatabase(calculationResult);
  };

  const saveToDatabase = async (calculationResult: CalculationResult) => {
    setIsSaving(true);
    setSaveMessage(null);

    try {
      const saveResult = await saveStudentRecord(
        student,
        subjects,
        previousSemesters,
        calculationResult.sgpa,
        calculationResult.cgpa,
        calculationResult.totalCredits
      );

      if (saveResult.success) {
        setSaveMessage({ type: 'success', text: 'Data saved successfully!' });
      } else {
        setSaveMessage({
          type: 'error',
          text: `Save failed: ${saveResult.error}`,
        });
      }
    } catch (error) {
      setSaveMessage({
        type: 'error',
        text: 'Failed to save data to database',
      });
    }

    setIsSaving(false);

    // Clear message after 3 seconds
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const resetForm = () => {
    setStudent({ name: '', usn: '', semester: 1 });
    setSubjects([{ id: '1', name: '', credits: 3, internalMarks: 0 }]);
    setPreviousSemesters([]);
    setShowPrevious(false);
    setResult(null);
    setSaveMessage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {isCalculating && <LoadingAnimation />}

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-8 shadow-2xl">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="mr-4 animate-pulse" size={48} />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Grade Calculator
            </h1>
          </div>
          <p className="text-lg md:text-xl opacity-90 font-light">
            Professional SGPA & CGPA Calculator for Students
          </p>
        </div>
      </div>

      {/* Save Status Message */}
      {saveMessage && (
        <div
          className={`fixed top-20 right-4 z-40 p-4 rounded-lg shadow-lg flex items-center space-x-2 ${
            saveMessage.type === 'success'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700'
              : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-700'
          }`}
        >
          {saveMessage.type === 'success' ? (
            <Save className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span className="font-medium">{saveMessage.text}</span>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {!result ? (
          <>
            <StudentInfo student={student} setStudent={setStudent} />
            <SubjectForm subjects={subjects} setSubjects={setSubjects} />
            <PreviousSemesters
              previousSemesters={previousSemesters}
              setPreviousSemesters={setPreviousSemesters}
              showPrevious={showPrevious}
              setShowPrevious={setShowPrevious}
            />
      <div className="flex items-start mb-6">
  <input
    type="checkbox"
    id="consent"
    className="mr-2 mt-1"
    checked={consentGiven}
    onChange={(e) => setConsentGiven(e.target.checked)}
  />
  <label htmlFor="consent" className="text-sm text-gray-700 dark:text-gray-300">
    I agree to the <a href="/home/project/.docx" className="underline text-blue-600 dark:text-blue-400" target="_blank">Terms & Conditions and Privacy Policy </a>
   
  </label>
</div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
  onClick={calculateResults}
  disabled={!consentGiven || isCalculating || isSaving}
  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center font-semibold shadow-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed"
>
  <Calculator className="mr-3" size={24} />
  {isCalculating ? 'Calculating...' : 'Calculate Results'}
</button>


              <button
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 rounded-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center font-semibold shadow-lg text-lg"
              >
                Reset Form
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-8">
              <button
                onClick={() => setResult(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
              >
                ← Back to Form
              </button>
            </div>

            <ResultsDisplay
              result={result}
              student={student}
              previousSemesters={previousSemesters}
            />
          </>
        )}
      </div>
    </div>
  );
};