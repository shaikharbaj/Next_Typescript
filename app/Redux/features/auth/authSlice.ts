import privateRequest from "@/app/Interceptor/interceptor";
import Helper from "@/app/utils/helper";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";

let initialState: any = {
  userinfo: Helper.getUser() || null,
  token: Helper.getLocalToken() || null,
  customerAddress: [],
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

interface ValidationError {
  email?: string;
  password?: string;
}

//register......
interface RegisterResponse {
  id: number;
  email: string;
  password: string;
  avatar?: string;
}

interface ForgotPassword {
  email: string;
}
interface VerifyOtp {
  email: string;
  otp: number;
}
interface ResetPassword {
  email: string;
  otp: number;
  password: string;
  confirmpassword: string;
}
interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  file?: File;
}
interface forgotpasswordwithlinkPayload {
  email: string;
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
      const response = await axios.post(
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
export const loginAdminAsync = createAsyncThunk(
  "auth/adminlogin",
  async (payload: LoginPayload, thunkAPI) => {
    try {
      const response = await axios.post<LoginResponse>(
        "http://localhost:8000/user/login_admin",
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
interface ILoginPayload {
  email: string;
  password: string;
}
export const loginsupplierAsync = createAsyncThunk(
  "supplier/login",
  async (payload: ILoginPayload, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/supplier/login",
        payload
      );
      return response.data;
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
export const registerUserAsync = createAsyncThunk(
  "auth/create_user",
  async (payload: FormData, thunkAPI) => {
    try {
      const response = await axios.post<RegisterResponse>(
        "http://localhost:8000/user/create_user",
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

export const updateuserProfileAsync = createAsyncThunk(
  "auth/updateuserprofile",
  async (payload: FormData, thunkAPI) => {
    try {
      const response = await privateRequest.patch(
        "http://localhost:8000/user/updateprofile",
        payload
      );
      const data = await response.data;
      return data;
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

export const forgotpasswordAsync = createAsyncThunk(
  "auth/forgotpassword",
  async (payload: ForgotPassword, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/user/forgot-password",
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

export const verifyOtpAsync = createAsyncThunk(
  "auth/verifyOtpAsync",
  async (payload: VerifyOtp, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/user/verify-otp",
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

export const resetpasswordAsync = createAsyncThunk(
  "auth/resetpassword",
  async (payload: ResetPassword, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/user/reset-password",
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

export const forgotpasswordwithlink = createAsyncThunk(
  "auth/forgot-passwordwithlink",
  async (payload: forgotpasswordwithlinkPayload, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/user/forgot-passwordlink",
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
export const resetpasswordwithlinkAsync = createAsyncThunk(
  "auth/resetpasswordwithlink",
  async (payload: any, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/user/reset-passwordlink/${payload.id}/${payload.token}`,
        { password: payload.password, confirmpassword: payload.confirmpassword }
      );
      return response.data;
    } catch (error: any) {
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

//add address....
interface IAddAddressPayload {
  country: string;
  state: string;
  city: string;
  addressLine1: string;
  zipcode: number;
  phone_number: number;
}
export const addAddressAsync = createAsyncThunk(
  "user/addAddress",
  async (payload: IAddAddressPayload, thunkAPI) => {
    try {
      console.log(payload);
      const response = await privateRequest.post(
        "http://localhost:8000/user/add_address",
        payload
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const loadAllAddressOfUserAsync = createAsyncThunk(
  "user/loadalladdressofuser",
  async (payload, thunkAPI) => {
    try {
      const response = await privateRequest.get(
        "http://localhost:8000/user/getalladdressofuser"
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  initialState,
  name: "auth",
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
    },
    setEmail: (state, action) => {
      state.email = action.payload.email;
    },
    setOtp: (state, action) => {
      console.log(action.payload);
      state.otp = action.payload;
    },
    clearemail_otp: (state) => {
      state.otp = null;
      state.email = null;
    },
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
      .addCase(registerUserAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUserAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        const token = action.payload.token;
        // const decodedUser = jwtDecode<JwtPayload>(token);
        state.userinfo = action.payload;
        state.token = token;
        Helper.setToken(token);
        state.loading = false;
        state.success = true;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginAdminAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginAdminAsync.fulfilled, (state, action) => {
        const token = action.payload.token;
        // const decodedUser = jwtDecode<JwtPayload>(token);
        state.userinfo = action.payload;
        state.token = token;
        Helper.setToken(token);
        state.loading = false;
        state.success = true;
      })
      .addCase(loginAdminAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginsupplierAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginsupplierAsync.fulfilled, (state, action) => {
        const token = action.payload.token;
        state.userinfo = action.payload.data;
        state.token = token;
        Helper.setToken(action.payload.token);
        state.loading = false;
      })
      .addCase(loginsupplierAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateuserProfileAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateuserProfileAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userinfo = action.payload;
      })
      .addCase(updateuserProfileAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(forgotpasswordAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(forgotpasswordAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(forgotpasswordAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyOtpAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(verifyOtpAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(verifyOtpAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetpasswordAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(resetpasswordAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(resetpasswordAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(forgotpasswordwithlink.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(forgotpasswordwithlink.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(forgotpasswordwithlink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetpasswordwithlinkAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(resetpasswordwithlinkAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(resetpasswordwithlinkAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addAddressAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addAddressAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.customerAddress.push(action.payload.data)
        console.log(action.payload.data);
      })
      .addCase(addAddressAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(loadAllAddressOfUserAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadAllAddressOfUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.customerAddress = action.payload.data;
      })
      .addCase(loadAllAddressOfUserAsync.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
export const {
  clearState,
  logout,
  setuserprofiledata,
  setEmail,
  setOtp,
  clearemail_otp,
} = authSlice.actions;
