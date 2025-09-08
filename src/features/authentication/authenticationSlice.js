import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth, signOut } from 'firebase/auth';
import { saveUserToFirestore } from '../../api/firebase/firebase.user.firestore';

// Thunk: Save Google login user to Firestore & store in Redux
export const addUser = createAsyncThunk(
  'authentication/addUser',
  async (user, { rejectWithValue }) => {
    try {
      if (!user) throw new Error('No user data provided');

      console.log('Google user data:', user);
      // Save/update Firestore
      await saveUserToFirestore(user);

      return {
        uid: user.uid,
        name: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || '',
      };
    } catch (error) {
      return rejectWithValue(
        error.message
          .replace('Firebase:', '')
          .replace('auth/', '')
          .replace(/-/g, ' ')
      );
    }
  }
);

// ✅ Logout thunk
export const logoutUser = createAsyncThunk(
  'authentication/logout',
  async (_, { rejectWithValue }) => {
    try {
      const auth = getAuth();
      await signOut(auth);
      return null; // ✅ only return, no code after this
    } catch (error) {
      return rejectWithValue(
        error.message
          .replace('Firebase:', '')
          .replace('auth/', '')
          .replace(/-/g, ' ')
      );
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Google login
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authenticationSlice.reducer;
