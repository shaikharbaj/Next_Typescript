import privateRequest from "@/app/Interceptor/interceptor";
import Helper from "@/app/utils/helper";
import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";

let initialState: any = {
  userinfo: Helper.getUser() || null,
  token: Helper.getLocalToken() || null,
  error: null,
  success: null,
  loading: null,
  email: null,
  otp: null,
};
//login response....
interface LoginResponse {
  token: string;
}
interface LoginPayload {
  email: string;
  password: string;
}

export const loadUserAsync = createAsyncThunk(
  "auth/loadUser",
  async (payload, thunkAPI) => {
    try {
      const response = await privateRequest.get("/user/loaduser");
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
      // Handle other errors not related to Axios
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, thunkAPI) => {
    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:8000/user/login_user",
        payload
      );
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
      // Handle other errors not related to Axios
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);


const adminSlice = createSlice({
  initialState,
  name: "admin",
  reducers: {
    clearState: (state) => {
      state.loading = null;
      state.error = null;
      state.success = null;
    },
    logout: (state) => {
      state.token = null;
      state.userinfo = null;
      Helper.removeToken();
    },
    setuserprofiledata: (state, action) => {
      state.userinfo = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userinfo = action.payload;
      })
      .addCase(loadUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUserAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        const token = action.payload.token;
        const decodedUser = jwtDecode<JwtPayload>(token);
        state.userinfo = decodedUser;
        state.token = token;
        Helper.setToken(token);
        state.loading = false;
        state.success = true;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    //   .addCase(updateuserProfileAsync.pending, (state, action) => {
    //     state.loading = true;
    //   })
    //   .addCase(updateuserProfileAsync.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.success = true;
    //     state.userinfo = action.payload;
    //   })
    //   .addCase(updateuserProfileAsync.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })
  },
});

export default adminSlice.reducer;
export const {
  clearState,
  logout,
  setuserprofiledata
} = adminSlice.actions;
