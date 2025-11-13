import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, refreshUser, registerUser } from "./authOperations";

const initialState = {
    user: {
        name: null,
        email: null,
        avatarURL: null,
    },
    token: null,
    refreshToken: null,
    isLoggedIn: false,
    isRefreshing: false,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.user = payload.user;
                state.token = payload.token;
                state.refreshToken = payload.refreshToken;
                state.isLoggedIn = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //Login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.user = payload.user;
                state.token = payload.token;
                state.refreshToken = payload.refreshToken;
                state.isLoggedIn = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //Refresh user
            .addCase(refreshUser.pending, (state) => {
                state.isRefreshing = true;
            })
            .addCase(refreshUser.fulfilled, (state, { payload }) => {
                state.isRefreshing = false;
                state.user = payload.user;
                state.isLoggedIn = true;
            })
            .addCase(refreshUser.rejected, (state) => {
                state.isRefreshing = false;
            })

            //Logout
            .addCase(logoutUser.fulfilled, () => {
                return { ...initialState }
            })
    }
})

export default authSlice.reducer;