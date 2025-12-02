import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../auth/authOperations";

export const fetchPets = createAsyncThunk(
    "pets/fetchPets",
    async (_, thunkAPI) => {
        const state = thunkAPI.getState().pets;
        const { page, limit, search, category, gender, type, location, sort } = state;

        const params = { page, limit };

        if (search) params.keyword = search;
        if (category) params.category = category;
        if (gender) params.sex = gender;
        if (type) params.species = type;
        if (location) params.location = location;
        if (sort) params.sort = sort;

        try {
            const { data } = await api.get("/notices", { params });

            return {
                items: data.results,
                page: data.page,
                totalPages: data.totalPages
            };
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);


export const fetchCategories = createAsyncThunk(
    "pets/fetchCategories",
    async (_, thunkAPI) => {
        try {
            const { data } = await api.get("/notices/categories");
            return data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const fetchGenders = createAsyncThunk(
    "pets/fetchGenders",
    async (_, thunkAPI) => {
        try {
            const { data } = await api.get("/notices/sex");
            return data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const fetchTypes = createAsyncThunk(
    "pets/fetchTypes",
    async (_, thunkAPI) => {
        try {
            const { data } = await api.get("/notices/species");
            return data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);


export const fetchNoticeById = createAsyncThunk(
    "pets/fetchNoticeById",
    async (id, thunkAPI) => {
        try {
            const { data } = await api.get(`/notices/${id}`);
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message);
        }
    }
);