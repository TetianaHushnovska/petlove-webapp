import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const api = axios.create({
    baseURL: "https://petlove.b.goit.study/api",
    withCredentials: false,
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

            const { data } = await api.get("/users/current/full");
            return data;

        } catch (error) {
            return thunkAPI.rejectWithValue("Unauthorized");
        }
    }
);

//Update user
export const updateUser = createAsyncThunk(
    "auth/updateUser",
    async (data, thunkAPI) => {
        try {
            const res = await api.patch("/users/current/edit", data);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

//Fetch current user
export const fetchCurrentUser = createAsyncThunk(
    "auth/fetchCurrentUser",
    async (_, thunkAPI) => {
        try {
            const { data } = await api.get("/users/current/full");
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

//Add favorite
export const addFavorite = createAsyncThunk(
    "auth/addFavorite",
    async (id, thunkAPI) => {
        try {
            const { data } = await api.post(`/notices/favorites/add/${id}`);
            return data;
        } catch (error) {
            if (error.response?.status === 409) {
                return thunkAPI.fulfillWithValue(
                    thunkAPI.getState().auth.user.noticesFavorites
                );
            }

            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

//Remove favorite
export const removeFavorite = createAsyncThunk(
    "auth/removeFavorite",
    async (id, thunkAPI) => {
        try {
            const { data } = await api.delete(`/notices/favorites/remove/${id}`);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

//Upload avatar
export const uploadAvatar = createAsyncThunk(
    "auth/uploadAvatar",
    async (formData, thunkAPI) => {
        try {
            const { data } = await api.patch("/users/avatar", formData);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

//Add pet
export const addPet = createAsyncThunk(
    "pets/addPet",
    async (petData, thunkAPI) => {
        try {
            const { data } = await api.post("/users/current/pets/add", petData);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const deletePet = createAsyncThunk(
    "pets/deletePet",
    async (petId, thunkAPI) => {
        try {
            const { data } = await api.delete(`/users/current/pets/remove/${petId}`);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);
