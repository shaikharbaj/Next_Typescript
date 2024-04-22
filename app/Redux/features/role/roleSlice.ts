import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loadRolesAsyncThunk = createAsyncThunk("role/loadrole", async (payload, thunkAPI) => {
    const response = await axios.get('http://localhost:8000/role/allroles');
    return response.data.roles;
    try {

    } catch (error) {
        console.log(error)
    }

})
interface IRoleInitial {
    loading: boolean,
    roles: [];
}
const initialState: IRoleInitial = {
    loading: false,
    roles: []
}
const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loadRolesAsyncThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(loadRolesAsyncThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.roles = action.payload
            })
            .addCase(loadRolesAsyncThunk.rejected, (state, action) => {
                state.loading = false;
            })
    }
})

export default roleSlice.reducer;
export const { } = roleSlice.actions;