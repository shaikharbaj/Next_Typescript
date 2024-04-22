import privateRequest from "@/app/Interceptor/interceptor";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
type metaType = {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
};
type initialStateType = {
  loading: boolean | null;
  error: any;
  users: any;
  success: boolean | null;
  meta: metaType;
};
const initialState: initialStateType = {
  loading: null,
  error: null,
  users: null,
  success: null,
  meta: {
    total: 0,
    lastPage: 0,
    currentPage: 1,
    perPage: 0,
    prev: null,
    next: null,
  },
};
type Payload = {
  currentpage: number;
  searchTerm: string;
};
//get product........
export const loadAllUserAsync = createAsyncThunk(
  "user/loaduser",
  async (payload: Payload, thunkAPI) => {
    try {
      const { currentpage, searchTerm } = payload;
      const response = await privateRequest.get(
        `http://localhost:8000/user?page=${currentpage}&searchTerm=${searchTerm}`
      );
      const data = await response.data;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        if (error.response && error.response.data.message) {
          // Handle validation errors
          return thunkAPI.rejectWithValue(error.response.data.message);
        }
      }
      // Handle other errors not related to Axios
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearstate: (state) => {
      (state.loading = null), (state.error = null), (state.success = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAllUserAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadAllUserAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.success = true;
        state.users = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(loadAllUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
export const { clearstate } = userSlice.actions;
