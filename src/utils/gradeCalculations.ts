import { Grade, GradeInfo, Subject, PreviousSemester } from '../types';

export const GRADE_SCALE: Record<Grade, GradeInfo> = {
  'O': { points: 10, minMarks: 90, maxMarks: 100, level: 'Outstanding' },
  'A+': { points: 9, minMarks: 80, maxMarks: 89, level: 'Excellent' },
  'A': { points: 8, minMarks: 70, maxMarks: 79, level: 'Very Good' },
  'B+': { points: 7, minMarks: 60, maxMarks: 69, level: 'Good' },
  'B': { points: 6, minMarks: 55, maxMarks: 59, level: 'Above Average' },
  'C': { points: 5, minMarks: 50, maxMarks: 54, level: 'Average' },
  'P': { points: 4, minMarks: 40, maxMarks: 49, level: 'Pass' },
  'F': { points: 0, minMarks: 0, maxMarks: 39, level: 'Fail' }
};

export const calculateRequiredMarks = (internalMarks: number, credits: number) => {
  const x = 90 - internalMarks;

  const getRequired = (deduction: number) => {
    const base = credits === 1 ? x : x * 2;
    const required = base - deduction;
    return credits === 1 ? Math.max(17.5, required) : Math.max(35, required);
  };

  return {
    O: credits === 1 ? Math.max(17.5, x) : Math.max(35, x * 2),
    'A+': getRequired(credits === 1 ? 10 : 20),
    'A': getRequired(credits === 1 ? 20 : 40),
    'B+': getRequired(credits === 1 ? 30 : 60),
    'B': getRequired(credits === 1 ? 35 : 70),
    'C': getRequired(credits === 1 ? 40 : 80),
    'P': getRequired(credits === 1 ? 50 : 100)
  };
};

export const getGradeFromTotalMarks = (totalPercentage: number): Grade => {
  if (totalPercentage >= 90) return 'O';
  if (totalPercentage >= 80) return 'A+';
  if (totalPercentage >= 70) return 'A';
  if (totalPercentage >= 60) return 'B+';
  if (totalPercentage >= 55) return 'B';
  if (totalPercentage >= 50) return 'C';
  if (totalPercentage >= 40) return 'P';
  return 'F';
};

export const calculateSubjectGrade = (subject: Subject): Subject => {
  const requiredMarks = calculateRequiredMarks(subject.internalMarks, subject.credits);

  let estimatedExternalMarks: number;
  let selectedGrade: Grade;

  if (subject.selectedGrade && requiredMarks[subject.selectedGrade] !== undefined) {
    estimatedExternalMarks = requiredMarks[subject.selectedGrade];
    selectedGrade = subject.selectedGrade;
  } else {
    estimatedExternalMarks = requiredMarks.P;
    selectedGrade = 'P';
  }

  estimatedExternalMarks = Math.min(
    estimatedExternalMarks,
    subject.credits === 1 ? 50 : 100
  );

  let totalPercentage: number;
  if (subject.credits === 1) {
    totalPercentage = subject.internalMarks + estimatedExternalMarks;
  } else {
    totalPercentage = subject.internalMarks + (estimatedExternalMarks / 2);
  }

  const finalGrade = subject.selectedGrade || getGradeFromTotalMarks(totalPercentage);
  const gradePoints = GRADE_SCALE[finalGrade].points;

  return {
    ...subject,
    grade: finalGrade,
    gradePoints,
    totalMarks: totalPercentage,
    estimatedExternalMarks
  };
};

export const calculateSGPA = (subjects: Subject[]): number => {
  const processedSubjects = subjects.map(calculateSubjectGrade);

  const totalCreditPoints = processedSubjects.reduce((sum, subject) => {
    return sum + subject.credits * (subject.gradePoints || 0);
  }, 0);

  const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);

  return totalCredits > 0 ? totalCreditPoints / totalCredits : 0;
};

export const calculateCGPA = (
  currentSGPA: number,
  currentCredits: number,
  previousSemesters: PreviousSemester[]
): number => {
  const currentCreditPoints = currentSGPA * currentCredits;

  const previousCreditPoints = previousSemesters.reduce(
    (sum, sem) => sum + sem.sgpa * sem.credits,
    0
  );

  const previousCredits = previousSemesters.reduce(
    (sum, sem) => sum + sem.credits,
    0
  );

  const totalCreditPoints = currentCreditPoints + previousCreditPoints;
  const totalCredits = currentCredits + previousCredits;

  return totalCredits > 0 ? totalCreditPoints / totalCredits : currentSGPA;
};