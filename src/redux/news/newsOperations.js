import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const api = axios.create({
    baseURL: "https://petlove.b.goit.study/api",
});

export const fetchNews = createAsyncThunk(
    "news/fetch",
    async ({ page, limit, keyword }, thunkAPI) => {
        try {
            const params = { page, limit };

            if (keyword && keyword.trim() !== "") {
                params.keyword = keyword.trim();
            }

            const { data } = await api.get("/news", { params });

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);