// firebase.user.firestore.js
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase.index';

/**
 * Add or update user info in Firestore safely
 * @param {Object} user - Firebase Auth user object
 */
export const saveUserToFirestore = async (user) => {
  console.log('Saving user to Firestore:', user);
  if (!user) return;

  try {
    const userRef = doc(db, 'users', user.uid);

    await setDoc(
      userRef,
      {
        uid: user.uid,
        name: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || '',
        lastLogin: serverTimestamp(),
      },
      { merge: true }
    );

    console.log(`User ${user.uid} saved/updated successfully`);
  } catch (error) {
    console.error('Error saving user to Firestore:', error.message);
    throw error; // rethrow so caller can handle UI feedback
  }
};
