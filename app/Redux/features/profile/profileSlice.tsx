import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface IProfilePayload{
       id:number
}
export const loadProfileAsyncThunk = createAsyncThunk("profile/loadProfile", async (payload:IProfilePayload, thunkAPI) => {
    try {
        const response = await axios.get(`http://localhost:8000/user/${payload.id}`);
        return response.data.data;
    } catch (error) {
        console.log(error)
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
    }
})

export default profileSlice.reducer;
export const { } = profileSlice.actions;