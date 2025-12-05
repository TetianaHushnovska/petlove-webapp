import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../auth/authOperations";

export const fetchFavorites = createAsyncThunk(
    "favorites/fetchFavorites",
    async (_, thunkAPI) => {
        try {
            const { data } = await api.get("/users/current/full");
            return {
                favorites: data.noticesFavorites,
                viewed: data.noticesViewed,
            };
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const addToFavorites = createAsyncThunk(
    "favorites/addToFavorites",
    async (id, thunkAPI) => {
        try {
            await api.post(`/notices/favorites/add/${id}`);
            thunkAPI.dispatch(fetchFavorites());
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const removeFromFavorites = createAsyncThunk(
    "favorites/removeFromFavorites",
    async (id, thunkAPI) => {
        try {
            await api.delete(`/notices/favorites/remove/${id}`);
            thunkAPI.dispatch(fetchFavorites());
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);
