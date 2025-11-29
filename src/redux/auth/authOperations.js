import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const api = axios.create({
    baseURL: "https://petlove.b.goit.study/api",
});

export const setToken = (token) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export const clearToken = () => {
    delete api.defaults.headers.common.Authorization;
}

// Register
export const registerUser = createAsyncThunk(
    "auth/register",
    async (data, thunkAPI) => {
        try {
            const response = await api.post("/users/signup", data);
            setToken(response.data.token);
            return response.data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.response.data?.message || "Error")
        }
    }
);

// Login
export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials, thunkAPI) => {
        try {
            const response = await api.post("/users/signin", credentials);
            setToken(response.data.token);
            return response.data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.response.data?.message || "Error")
        }
    }
);

// Logout
export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            await api.post("/users/signout");
            clearToken();
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.response.data?.message || "Error")
        }
    }
);

// Refresh user
export const refreshUser = createAsyncThunk(
    "auth/refresh",
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const token = state.auth.token;

        if (!token) {
            return thunkAPI.rejectWithValue("No token");
        }

        try {
            api.defaults.headers.common.Authorization = `Bearer ${token}`;

            const { data } = await api.get("/users/current");
            return data;

        } catch (error) {
            return thunkAPI.rejectWithValue("Unauthorized");
        }
    }
);
