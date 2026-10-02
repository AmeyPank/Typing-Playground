import { auth, firebase } from "../firebaseConfig";
import errorMapping from "../Utils/errorMapping";

export class AuthService {
  // Authenticate user using email and password
  static async loginWithEmail(email, password) {
    if (!email || !password) {
      throw new Error("Please enter both email and password.");
    }
    try {
      return await auth.signInWithEmailAndPassword(email.trim(), password);
    } catch (error) {
      throw new Error(this.getErrorMessage(error.code, error.message));
    }
  }

  static async signUpWithEmail(email, password) {
    if (!email || !password) {
      throw new Error("Please enter all required fields.");
    }
    try {
      return await auth.createUserWithEmailAndPassword(email.trim(), password);
    } catch (error) {
      throw new Error(this.getErrorMessage(error.code, error.message));
    }
  }

  static async signInWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      return await auth.signInWithPopup(provider);
    } catch (error) {
      throw new Error(this.getErrorMessage(error.code, error.message));
    }
  }

  static async signOutUser() {
    try {
      await auth.signOut();
    } catch (error) {
      throw new Error(this.getErrorMessage(error.code, "Failed to sign out."));
    }
  }

  static getCurrentUser() {
    return auth.currentUser;
  }

  static getErrorMessage(code, fallbackMessage = "An unexpected error occurred.") {
    return errorMapping[code] || fallbackMessage;
  }
}
