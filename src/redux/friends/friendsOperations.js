import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../auth/authOperations";

export const fetchFriends = createAsyncThunk(
    "friends/fetchAll",
    async (__dirname, thunkAPI) => {
        try {
            const response = await api.get("/friends");

            return response.data;
        }
        catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)