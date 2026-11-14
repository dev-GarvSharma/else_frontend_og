import { createSlice } from "@reduxjs/toolkit";
import LocalStorageService from "../../app/localStorageService";

const initialState = {
  isLoggedIn: Boolean(LocalStorageService.getAccessToken()),
  user: LocalStorageService.getUserData(),
  isDialogOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthSession: (state, action) => {
      state.user = action.payload || null;
      state.isLoggedIn = Boolean(action.payload);
    },
    clearAuthSession: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = Boolean(action.payload);
      if (!state.isLoggedIn) state.user = null;
    },
    openAuthDialog: (state) => {
      state.isDialogOpen = true;
    },
    closeAuthDialog: (state) => {
      state.isDialogOpen = false;
    },
  },
});

export const {
  setAuthSession,
  clearAuthSession,
  setIsLoggedIn,
  openAuthDialog,
  closeAuthDialog,
} = authSlice.actions;

export const getIsLoggedIn = (state) => state.auth.isLoggedIn;
export const getCurrentUser = (state) => state.auth.user;
export const getAuthDialogOpen = (state) => state.auth.isDialogOpen;

export default authSlice.reducer;
