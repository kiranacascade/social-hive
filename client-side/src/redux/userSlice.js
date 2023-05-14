import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: 0,
    username: "",
    email: "",
    is_verified: false,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.id = action.payload.id;
      state.value.username = action.payload.username;
      state.value.email = action.payload.email;
      state.value.is_verified = action.payload.is_verified;
    },
    logout: (state) => {
      state.value.id = 0;
      state.value.username = "";
      state.value.email = "";
      state.value.is_verified = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
