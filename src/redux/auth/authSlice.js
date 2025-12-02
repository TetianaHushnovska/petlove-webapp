import { createSlice } from "@reduxjs/toolkit";
import {
    addFavorite,
    fetchCurrentUser,
    loginUser,
    logoutUser,
    refreshUser,
    registerUser,
    removeFavorite,
    updateUser,
    uploadAvatar,
} from "./authOperations";

const initialState = {
    user: {
        _id: null,
        name: null,
        email: null,
        avatar: null,
        phone: null,

        pets: [],
        noticesFavorites: [],
        noticesViewed: [],
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
            //Register user
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;

                state.user = {
                    ...state.user,
                    name: payload.user.name,
                    email: payload.user.email,

                    avatar: payload.user.avatarURL ?? state.user.avatar,
                    phone: payload.user.phone ?? state.user.phone,
                };

                state.token = payload.token;
                state.refreshToken = payload.refreshToken || null;
                state.isLoggedIn = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //Log in
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;

                state.user = {
                    ...state.user,
                    name: payload.name,
                    email: payload.email,

                    avatar: payload.avatarURL ?? state.user.avatar,
                    phone: payload.phone ?? state.user.phone,
                };

                state.token = payload.token;
                state.refreshToken = payload.refreshToken || null;
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
                state.isLoggedIn = true;

                state.user = {
                    ...state.user,
                    _id: payload._id,
                    name: payload.name,
                    email: payload.email,

                    avatar: payload.avatar ?? state.user.avatar,
                    phone: payload.phone ?? state.user.phone,

                    pets: payload.pets ?? state.user.pets,
                    noticesFavorites: payload.noticesFavorites ?? state.user.noticesFavorites,
                    noticesViewed: payload.noticesViewed ?? state.user.noticesViewed,
                };
            })
            .addCase(refreshUser.rejected, (state) => {
                state.isRefreshing = false;
            })

            //Log out
            .addCase(logoutUser.fulfilled, () => ({
                ...initialState,
            }))

            //Fetch current user
            .addCase(fetchCurrentUser.pending, (state) => {
                state.isRefreshing = true;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
                state.isRefreshing = false;
                state.isLoggedIn = true;

                state.user = {
                    ...state.user,
                    _id: payload._id,
                    name: payload.name,
                    email: payload.email,

                    avatar: payload.avatar ?? state.user.avatar,
                    phone: payload.phone ?? state.user.phone,

                    pets: payload.pets ?? state.user.pets,
                    noticesFavorites: payload.noticesFavorites ?? state.user.noticesFavorites,
                    noticesViewed: payload.noticesViewed ?? state.user.noticesViewed,
                };
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.isRefreshing = false;
                state.error = action.payload;
                state.isLoggedIn = false;
                state.token = null;
            })

            //Update user
            .addCase(updateUser.fulfilled, (state, { payload }) => {
                state.user = {
                    ...state.user,
                    name: payload.name ?? state.user.name,
                    email: payload.email ?? state.user.email,

                    phone: payload.phone ?? state.user.phone,
                    avatar:
                        payload.avatar ??
                        payload.avatarURL ??
                        state.user.avatar,
                };
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error = action.payload;
            })

            //Favorites
            .addCase(addFavorite.fulfilled, (state, { payload }) => {
                state.user.noticesFavorites = payload;
            })
            .addCase(removeFavorite.fulfilled, (state, { payload }) => {
                state.user.noticesFavorites = payload;
            })

            //Upload avatar
            .addCase(uploadAvatar.fulfilled, (state, { payload }) => {
                state.user.avatar = payload.avatarURL ?? payload.avatar;
            });
    },
});

export default authSlice.reducer;
