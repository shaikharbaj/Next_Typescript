import privateRequest from "@/app/Interceptor/interceptor";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    categories: []
}

export const loadCategoriesAsync = createAsyncThunk("categories/loadall", async (payload, thunkAPI) => {
    try {
        const response = await privateRequest.get("http://localhost:8000/category/all");
        return await response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorData = error.response.data;
            if (errorData.validationerror) {
                // Handle validation errors
                return thunkAPI.rejectWithValue(errorData.validationerror);
            } else {
                // Handle other error messages
                return thunkAPI.rejectWithValue(errorData.message);
            }
        }
    }
})
interface IAddCategory {
    name: string
}
export const addCategoryAsync = createAsyncThunk("categories/add", async (payload: IAddCategory, thunkAPI) => {
    try {
        const response = await privateRequest.post("http://localhost:8000/category/add", payload);
        return await response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorData = error.response.data;
            if (errorData.validationerror) {
                // Handle validation errors
                return thunkAPI.rejectWithValue(errorData.validationerror);
            } else {
                // Handle other error messages
                return thunkAPI.rejectWithValue(errorData.message);
            }
        }
    }
})

interface IAddSubCategory {
    name: string
}
export const addsubCategoryAsync = createAsyncThunk("categories/subadd", async (payload: IAddSubCategory, thunkAPI) => {
    try {
        const response = await privateRequest.post("http://localhost:8000/category/add/subcategory", payload);
        return await response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorData = error.response.data;
            if (errorData.validationerror) {
                // Handle validation errors
                return thunkAPI.rejectWithValue(errorData.validationerror);
            } else {
                // Handle other error messages
                return thunkAPI.rejectWithValue(errorData.message);
            }
        }
    }
})
const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loadCategoriesAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loadCategoriesAsync.fulfilled, (state, action) => {
                state.categories = action.payload.data;
                state.loading = false;
            })
            .addCase(loadCategoriesAsync.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(addCategoryAsync.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(addCategoryAsync.fulfilled, (state, action) => {

            })
            .addCase(addCategoryAsync.rejected, (state, action) => {
                state.loading = false;
            })
    }
})

export default categorySlice.reducer;