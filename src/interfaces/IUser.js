/**
 * @typedef {Object} IUserProfile
 * @property {string} uid - User unique identifier
 * @property {string} email - User email address
 * @property {string} displayName - User display name
 * @property {string} creationTime - Account creation timestamp string
 * @property {string} [photoURL] - User avatar image URL
 */

export const UserProfileSchema = {
  validate: (user) => {
    return Boolean(user && user.uid);
  },
  sanitize: (user) => {
    if (!user) return null;
    return {
      uid: user.uid || '',
      email: user.email || '',
      displayName: user.displayName || '',
      creationTime: user.metadata?.creationTime || ''
    };
  }
};

