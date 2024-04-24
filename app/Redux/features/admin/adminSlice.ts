import privateRequest from "@/app/Interceptor/interceptor";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState: any = {
  loading: false,
  counts: {},
  error: false
};

export const loadAllDashboardCount = createAsyncThunk(
  "auth/getalldashboardcount",
  async (payload, thunkAPI) => {
    try {
      const response = await privateRequest.get("http://localhost:8000/user/getalldashboardcount");
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response && error.response.data.message) {
          return thunkAPI.rejectWithValue(error.response.data.message);
        }
      }
      // Handle other errors not related to Axios
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

const adminSlice = createSlice({
  initialState,
  name: "admin",
  reducers: {
    clearstate: (state, action) => {
      state.loading = false;
      state.error = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAllDashboardCount.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadAllDashboardCount.fulfilled, (state, action) => {
        state.loading = false;
        state.counts = action.payload;
      })
      .addCase(loadAllDashboardCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
     
  },
});

export default adminSlice.reducer;
export const {
  clearstate
} = adminSlice.actions;
