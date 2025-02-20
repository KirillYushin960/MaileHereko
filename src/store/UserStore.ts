/* eslint-disable no-console */
import { makeAutoObservable } from 'mobx';
import { auth, googleProvider } from '@config/firebase';
import { signInWithPopup, signOut, User } from 'firebase/auth';

class UserStore {
  user: User | null = null;
  isLoading: boolean = true;

  constructor() {
    makeAutoObservable(this);

    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setUser(user);
      } else {
        this.setUser(null);
      }
      this.setLoading(false);
    });
  }

  setUser = (user: User | null) => {
    this.user = user;
  };

  setLoading = (loading: boolean) => {
    this.isLoading = loading;
  };

  loginWithGoogle = async () => {
    this.setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      this.setUser(result.user);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      this.setLoading(false);
    }
  };

  private logout = async () => {
    this.setLoading(true);
    try {
      await signOut(auth);
      this.setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      this.setLoading(false);
    }
  };
}

export const userStore = new UserStore();
