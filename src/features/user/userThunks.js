// src/features/user/userThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  // payloadCreator
  async (userId, { signal, rejectWithValue }) => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, { signal });
      if (!res.ok) {
        // API hata kodunu yakalayıp anlamlı bir payload döndürelim
        return rejectWithValue({ status: res.status, message: "Kullanıcı getirilemedi" });
      }
      const data = await res.json();
      return data; // -> action.payload
    } catch (err) {
      // İptal (abort) ya da ağ hatası olabilir
      return rejectWithValue({ message: err?.message || "Ağ hatası" });
    }
  }
);
