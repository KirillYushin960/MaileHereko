/* eslint-disable no-console */
import { makeAutoObservable } from 'mobx';
import { auth, googleProvider } from '@config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
  AuthError,
} from 'firebase/auth';

type AuthErrorCode =
  | 'auth/invalid-credential'
  | 'auth/email-already-in-use'
  | 'auth/weak-password'
  | 'auth/too-many-requests'
  | 'unknown';

class UserStore {
  user: User | null = null;
  isLoading = true;
  isRegistering = false;
  authError: { code: AuthErrorCode; message: string } | null = null;
  lastVisitedPage = '';

  constructor() {
    makeAutoObservable(this);

    auth.onAuthStateChanged((user) => {
      this.setUser(user);
      this.isLoading = false;
    });
  }

  setUser = (user: User | null) => {
    this.user = user;
  };

  setLastVisitedPage = (page: string) => {
    this.lastVisitedPage = page;
  };

  clearLastVisitedPage = () => {
    this.lastVisitedPage = '';
  };

  setSighIn = () => {
    this.isRegistering = false;
  };

  toggleRegistrationMode = () => {
    this.isRegistering = !this.isRegistering;
    this.clearAuthError();
  };

  private handleAuthError = (error: AuthError) => {
    const code = error.code as AuthErrorCode;
    let message = 'An unexpected error occurred';

    switch (code) {
      case 'auth/invalid-credential':
        message = 'Incorrect email or password';
        break;
      case 'auth/email-already-in-use':
        message = 'Email already in use';
        break;
      case 'auth/weak-password':
        message = 'Password should be at least 6 characters';
        break;
      case 'auth/too-many-requests':
        message = 'Too many attempts, try again later';
        break;
      default:
        console.error('Auth error:', error);
    }

    this.authError = { code, message };
  };

  clearAuthError = () => {
    this.authError = null;
  };

  registerWithEmail = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const displayName = `${firstName} ${lastName}`;
      await updateProfile(result.user, { displayName });
      this.clearAuthError();
      this.setUser({ ...result.user, displayName });
    } catch (error) {
      this.handleAuthError(error as AuthError);
    }
  };

  loginWithEmail = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      this.clearAuthError();
      this.setUser(result.user);
    } catch (error) {
      this.handleAuthError(error as AuthError);
    }
  };

  loginWithGoogle = async () => {
    try {
      this.isLoading = true;
      const result = await signInWithPopup(auth, googleProvider);
      this.clearAuthError();
      this.setUser(result.user);
    } catch (error) {
      this.handleAuthError(error as AuthError);
    } finally {
      this.isLoading = false;
    }
  };

  logout = async () => {
    try {
      await signOut(auth);
      this.setUser(null);
    } catch (error) {
      this.handleAuthError(error as AuthError);
    }
  };
}

export const userStore = new UserStore();
