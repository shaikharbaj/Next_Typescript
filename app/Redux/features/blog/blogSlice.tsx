import privateRequest from "@/app/Interceptor/interceptor";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface IInitialState {
    blogs: [],
    loading: boolean,
    // addblogloading: boolean
}
const initialState: IInitialState = {
    blogs: [],
    loading: false,
    // addblogloading:false
}
export const deleteblogAsync = createAsyncThunk("blog/delete", async (id: number, thunkAPI) => {
    try {
        const response = await privateRequest.delete(`http://localhost:8000/blog/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})
export const getAllblogAsync = createAsyncThunk('blog/allblog', async (payload, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:8000/blog/all');
        return response.data;
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

export const addblogAsync = createAsyncThunk('blog/addblog', async (payload: FormData, thunkAPI) => {
    try {
        const response = await privateRequest.post('http://localhost:8000/blog/add', payload);
        return response.data;
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

interface IEditBlogPayload {
    id: number,
    formdata: FormData
}
export const editblogAsync = createAsyncThunk('blog/editblog', async (payload: IEditBlogPayload, thunkAPI) => {
    try {
        const response = await privateRequest.patch(`http://localhost:8000/blog/edit/${payload.id}`, payload.formdata);
        return response.data;
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

export const loadblogbyID = createAsyncThunk('blog/loadblogbyID', async (id: number, thunkAPI) => {
    try {
        const response = await privateRequest.get(`http://localhost:8000/blog/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return thunkAPI.rejectWithValue(error?.response?.data);
          }
    }
})
interface IgetblogwithfilterPayload{
    selectedCategoryString:[],
    selectedsubcategoryString:[]
}
export const getblogwithfilterAsync = createAsyncThunk("blog/blogwithfilter",async(payload:IgetblogwithfilterPayload,thunkAPI)=>{
       try {
        const response = await privateRequest.get(`http://localhost:8000/blog/filter?selectedcategory=${payload.selectedCategoryString}&selectedsubcategory=${payload.selectedsubcategoryString}`);
        return response.data;
       } catch (error) {
        return thunkAPI.rejectWithValue(error);
       }
})
const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllblogAsync.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAllblogAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload.data;
            })
            .addCase(getAllblogAsync.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(addblogAsync.pending, (state, action) => {
                state.loading = true
            })
            .addCase(addblogAsync.fulfilled, (state, action) => {
                state.loading = false;
                //   state.blogs = action.payload.data;
            })
            .addCase(addblogAsync.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteblogAsync.pending, (state, action) => {
                state.loading = true
            })
            .addCase(deleteblogAsync.fulfilled, (state, action) => {
                state.loading = false;
                const Index = state.blogs.findIndex((b: any) => Number(b.id) === Number(action.payload.data.id))
                state.blogs.splice(Index, 1);
            })
            .addCase(deleteblogAsync.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(editblogAsync.pending, (state, action) => {
                state.loading = true
            })
            .addCase(editblogAsync.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(editblogAsync.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(getblogwithfilterAsync.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getblogwithfilterAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs=action.payload.data;
            })
            .addCase(getblogwithfilterAsync.rejected, (state, action) => {
                state.loading = false;
            })
    }
})

export default blogSlice.reducer;
export const { } = blogSlice.actions;