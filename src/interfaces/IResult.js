/**
 * @typedef {Object} ITestResult
 * @property {string} [id] - Document ID in Firestore
 * @property {number} wpm - Words per minute
 * @property {string} accuracy - Accuracy percentage string (e.g., "95%")
 * @property {string} characters - Formatted characters breakdown
 * @property {Date|any} timeStamp - Timestamp of test completion
 * @property {string} userId - User UID from Firebase Auth
 */

export const ResultSchema = {
  validate: (data) => {
    if (!data) return false;
    if (typeof data.wpm !== 'number' || isNaN(data.wpm)) return false;
    if (!data.userId) return false;
    return true;
  },
  normalize: (data) => {
    return {
      wpm: Number(data?.wpm) || 0,
      accuracy: data?.accuracy || '0%',
      characters: data?.characters || '0/0/0/0',
      timeStamp: data?.timeStamp || new Date(),
      userId: data?.userId || ''
    };
  }
};

