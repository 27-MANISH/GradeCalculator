import { Grade, GradeInfo, Subject, PreviousSemester } from '../types';

export const GRADE_SCALE: Record<Grade, GradeInfo> = {
  O: { points: 10, minMarks: 90, maxMarks: 100, level: 'Outstanding' },
  'A+': { points: 9, minMarks: 80, maxMarks: 89, level: 'Excellent' },
  A: { points: 8, minMarks: 70, maxMarks: 79, level: 'Very Good' },
  'B+': { points: 7, minMarks: 60, maxMarks: 69, level: 'Good' },
  B: { points: 6, minMarks: 55, maxMarks: 59, level: 'Above Average' },
  C: { points: 5, minMarks: 50, maxMarks: 54, level: 'Average' },
  P: { points: 4, minMarks: 40, maxMarks: 49, level: 'Pass' },
  F: { points: 0, minMarks: 0, maxMarks: 39, level: 'Fail' },
};

export const calculateRequiredMarks = (
  internalMarks: number,
  credits: number
): Record<Grade, number> => {
  if (credits === 1) {
    // For 1-credit subjects: Internal 50 + External 50 = Total 100
    const getRequiredFor1Credit = (targetPercentage: number) => {
      const requiredTotal = targetPercentage;
      const requiredExternal = requiredTotal - internalMarks;
      return Math.max(0, requiredExternal); // Allow impossible values for detection
    };

    return {
      O: getRequiredFor1Credit(90),
      'A+': getRequiredFor1Credit(80),
      A: getRequiredFor1Credit(70),
      'B+': getRequiredFor1Credit(60),
      B: getRequiredFor1Credit(55),
      C: getRequiredFor1Credit(50),
      P: getRequiredFor1Credit(40),
      F: getRequiredFor1Credit(0),
    };
  } else {
    // For multi-credit subjects: Internal 50 + External 100 = Total 150
    // Grade calculation: (Internal + External/2) = Total out of 100
    const getRequiredForMultiCredit = (targetPercentage: number) => {
      const requiredTotal = targetPercentage;
      const requiredExternal = (requiredTotal - internalMarks) * 2;
      return Math.max(0, requiredExternal); // Allow impossible values for detection
    };

    return {
      O: getRequiredForMultiCredit(90),
      'A+': getRequiredForMultiCredit(80),
      A: getRequiredForMultiCredit(70),
      'B+': getRequiredForMultiCredit(60),
      B: getRequiredForMultiCredit(55),
      C: getRequiredForMultiCredit(50),
      P: getRequiredForMultiCredit(40),
      F: getRequiredForMultiCredit(0),
    };
  }
};

export const getMinimumExternalMarks = (credits: number): number => {
  return credits === 1 ? 17.5 : 35;
};

export const getMaximumExternalMarks = (credits: number): number => {
  return credits === 1 ? 50 : 100;
};

export const isGradePossible = (
  grade: Grade,
  internalMarks: number,
  credits: number
): boolean => {
  const requiredMarks = calculateRequiredMarks(internalMarks, credits);
  const maxMarks = getMaximumExternalMarks(credits);
  const minMarks = getMinimumExternalMarks(credits);
  
  const required = requiredMarks[grade];
  return required <= maxMarks && required >= minMarks;
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

  if (subject.selectedGrade && isGradePossible(subject.selectedGrade, subject.internalMarks, subject.credits)) {
    // Use selected grade if it's possible
    estimatedExternalMarks = Math.max(
      requiredMarks[subject.selectedGrade],
      getMinimumExternalMarks(subject.credits)
    );
    selectedGrade = subject.selectedGrade;
  } else {
    // Calculate based on minimum passing marks
    estimatedExternalMarks = Math.max(
      requiredMarks.P,
      getMinimumExternalMarks(subject.credits)
    );
    selectedGrade = 'P';
  }

  // Ensure external marks don't exceed maximum
  estimatedExternalMarks = Math.min(estimatedExternalMarks, getMaximumExternalMarks(subject.credits));

  // Calculate total marks and percentage based on credit type
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
    estimatedExternalMarks,
  };
};

export const calculateSGPA = (subjects: Subject[]): number => {
  const processedSubjects = subjects.map(calculateSubjectGrade);

  const totalCreditPoints = processedSubjects.reduce((sum, subject) => {
    return sum + subject.credits * (subject.gradePoints || 0);
  }, 0);

  const totalCredits = subjects.reduce(
    (sum, subject) => sum + subject.credits,
    0
  );

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
