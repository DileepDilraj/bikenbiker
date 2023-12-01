import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import app from './config';

const auth = getAuth(app);

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // Handle the sign-in result
      // The result will contain user information and the token
      // You can either use this data here or return it to be used where this function is called
    })
    .catch((error) => {
      // Handle errors
      console.error('Sign in error:', error);
    });
};

export const handleSignOut = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    // You can perform additional cleanup actions here if needed
  }).catch((error) => {
    // An error happened during sign out.
    console.error('Sign out error:', error);
  });
};
