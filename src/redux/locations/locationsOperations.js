import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
    baseURL: "https://petlove.b.goit.study/api"
});

export const fetchAvailableCities = createAsyncThunk(
    "locations/fetchAvailable",
    async (_, thunkAPI) => {
        try {
            const { data } = await api.get("/locations");
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const searchCities = createAsyncThunk(
    "locations/searchCities",
    async (keyword, thunkAPI) => {
        if (!keyword || keyword.length < 3) return [];
        try {
            const { data } = await api.get("/locations", {
                params: { keyword }
            });
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

