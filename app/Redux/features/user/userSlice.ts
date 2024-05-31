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
  users: [],
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

//toggle status

export const togglestatus = createAsyncThunk(
  "user/togglestatus",
  async (id: number, thunkAPI) => {
    try {
      const response = await privateRequest.patch(
        `http://localhost:8000/user/togglestatus/${id}`
      );
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

//add address....
export const addAddressAsync = createAsyncThunk(
  "user/addAddress",
  async (payload, thunkAPI) => {
    try {
      const response = await privateRequest.post(
        "http://localhost:8000/user/add_address",
        payload
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
        state.loading = false;
        state.success = true;
        state.users = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(loadAllUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(togglestatus.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(togglestatus.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        console.log(state.users);
        const updatedData = action.payload;
        let newData = state.users.map((u: any) => {
          if (Number(u.id) === Number(updatedData.id)) {
            return updatedData;
          }
          return u;
        });
        state.users = newData;
      })
      .addCase(togglestatus.rejected, (state, action) => {
        state.loading = false;
      })
      ;
  },
});

export default userSlice.reducer;
export const { clearstate } = userSlice.actions;
