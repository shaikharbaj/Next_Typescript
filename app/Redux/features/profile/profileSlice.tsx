import privateRequest from "@/app/Interceptor/interceptor";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface IProfilePayload {
    id: number
}
interface IChangeRolePayload {
    user_id: number,
    role_id: number
}
export const loadProfileAsyncThunk = createAsyncThunk("profile/loadProfile", async (payload: IProfilePayload, thunkAPI) => {
    try {
        const response = await axios.get(`http://localhost:8000/user/${payload.id}`);
        return response.data.data;
    } catch (error) {
        console.log(error)
    }

})

export const changeRoleAsync = createAsyncThunk("profile/changerole", async (payload: IChangeRolePayload, thunkAPI) => {
    try {
        const response = await privateRequest.patch('http://localhost:8000/user/change_role', payload);
        return response.data.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            if (error.response && error.response.data.message) {
                // Handle validation errors
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
        }
        // Handle other errors not related to Axios
        return thunkAPI.rejectWithValue("An unknown error occurred");
    }
})
interface IRoleInitial {
    loading: boolean,
    profile: any;
}
const initialState: IRoleInitial = {
    loading: false,
    profile: {}
}
const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        updaterole: (stata, action) => {
            //find user in array...
            //  const user=state.
            //  console.log(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadProfileAsyncThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadProfileAsyncThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(loadProfileAsyncThunk.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(changeRoleAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(changeRoleAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(changeRoleAsync.rejected, (state, action) => {
                state.loading = false;
            })
    }
})

export default profileSlice.reducer;
export const { } = profileSlice.actions;