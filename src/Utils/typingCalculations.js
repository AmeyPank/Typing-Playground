export const calculateWPM = (correctCharacters, timeSpentInSeconds) => {
  const safeCharacters = Math.max(0, Number(correctCharacters) || 0);
  const safeSeconds = Math.max(1, Number(timeSpentInSeconds) || 1);
  const minutes = safeSeconds / 60;
  const wpm = (safeCharacters / 5) / minutes;
  return Math.round(wpm) || 0;
};

export const calculateAccuracy = (correctCount, totalCount) => {
  const safeCorrect = Math.max(0, Number(correctCount) || 0);
  const safeTotal = Math.max(0, Number(totalCount) || 0);

  if (safeTotal === 0) return 0;
  const accuracy = Math.round((safeCorrect / safeTotal) * 100);
  return Math.min(100, Math.max(0, accuracy)) || 0;
};
