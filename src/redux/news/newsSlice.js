import { createSlice } from "@reduxjs/toolkit";
import { fetchNews } from "./newsOperations";

const initialState = {
    items: [],
    total: 0,
    page: 1,
    limit: 6,
    keyword: '',
    isLoading: false,
    error: null,
}

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        setKeyword(state, action) {
            state.keyword = action.payload;
            state.page = 1;
        },
        setPage(state, action) {
            state.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.items = payload.results;
                state.total = payload.totalPages;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export const { setKeyword, setPage } = newsSlice.actions;
export default newsSlice.reducer;