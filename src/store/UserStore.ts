/* eslint-disable no-console */
import { makeAutoObservable } from 'mobx';
import { auth } from 'src/config/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);

    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setUser(user);
      } else {
        this.setUser(null);
      }
    });
  }

  setUser(user: User | null) {
    this.user = user;
  }

  async loginWithGoogle() {
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      this.setUser({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  }

  async logout() {
    try {
      await signOut(auth);
      this.setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
}

export const userStore = new UserStore();
