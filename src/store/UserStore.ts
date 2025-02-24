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
  lastAuthError: { code: AuthErrorCode; message: string } | null = null;

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

    this.lastAuthError = { code, message };
  };

  clearAuthError = () => {
    this.lastAuthError = null;
  };

  registerWithEmail = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    try {
      this.isLoading = true;
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const displayName = `${firstName} ${lastName}`;
      await updateProfile(result.user, { displayName });
      this.setUser({ ...result.user, displayName });
      this.clearAuthError();
    } catch (error) {
      this.handleAuthError(error as AuthError);
    } finally {
      this.isLoading = false;
    }
  };

  loginWithEmail = async (email: string, password: string) => {
    try {
      this.isLoading = true;
      const result = await signInWithEmailAndPassword(auth, email, password);
      this.setUser(result.user);
      this.clearAuthError();
    } catch (error) {
      this.handleAuthError(error as AuthError);
    } finally {
      this.isLoading = false;
    }
  };

  loginWithGoogle = async () => {
    try {
      this.isLoading = true;
      const result = await signInWithPopup(auth, googleProvider);
      this.setUser(result.user);
      this.clearAuthError();
    } catch (error) {
      this.handleAuthError(error as AuthError);
    } finally {
      this.isLoading = false;
    }
  };

  logout = async () => {
    try {
      this.isLoading = true;
      await signOut(auth);
      this.setUser(null);
    } catch (error) {
      this.handleAuthError(error as AuthError);
    } finally {
      this.isLoading = false;
    }
  };
}

export const userStore = new UserStore();
