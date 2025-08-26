// src/features/user/userSlice.js
import { createSlice, isPending, isFulfilled, isRejected } from "@reduxjs/toolkit";
import { fetchUser } from "./userThunks";

const initialState = {
  entity: null,
  loading: "idle", // 'idle' | 'pending' | 'succeeded' | 'failed'
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser(state) {
      state.entity = null;
      state.error = null;
      state.loading = "idle";
    },
  },
  extraReducers: (builder) => {
    // Spesifik case’ler
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.entity = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = "failed";
        // rejectWithValue ile gelen payload -> action.payload
        // throw edilen/hazır olmayan hata -> action.error
        state.error = action.payload?.message || action.error?.message || "Bilinmeyen hata";
      });

    // İsteğe bağlı: matcher’lar ile aynı anda birden fazla thunk aşamasını yakalama
    builder
      .addMatcher(isPending(fetchUser), (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addMatcher(isFulfilled(fetchUser), (state) => {
        state.loading = "succeeded";
      })
      .addMatcher(isRejected(fetchUser), (state, action) => {
        state.loading = "failed";
        state.error = action.payload?.message || action.error?.message || "Bilinmeyen hata";
      });
  },
});

export const { clearUser } = userSlice.actions;
export const selectUser = (state) => state.user.entity;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;
