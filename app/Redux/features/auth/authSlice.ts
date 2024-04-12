import privateRequest from "@/app/Interceptor/interceptor";
import Helper from "@/app/utils/helper";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";

let initialState: any = {
    userinfo: Helper.getUser() || null,
    token: Helper.getLocalToken() || null,
    error: null,
    success: null,
    loading: null
}
//login response....
interface LoginResponse {
    token: string
}
interface LoginPayload {
    email: string,
    password: string
}

interface ValidationError {
    email?: string,
    password?: string
}

//register......
interface RegisterResponse {
    id: number,
    email: string,
    password: string,
    avatar?: string,

}
interface RegisterPayload {
    name: string,
    email: string,
    password: string,
    file?: File
}

export const loginUserAsync = createAsyncThunk('auth/login', async (payload: LoginPayload, thunkAPI) => {
    try {
        const response = await axios.post<LoginResponse>("http://localhost:8000/user/login_user", payload);
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
        return thunkAPI.rejectWithValue('An unknown error occurred');
    }
})

export const registerUserAsync = createAsyncThunk("auth/create_user", async (payload: FormData, thunkAPI) => {
    try {
        const response = await axios.post<RegisterResponse>('http://localhost:8000/user/create_user', payload)
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
        return thunkAPI.rejectWithValue('An unknown error occurred');
    }
})


const authSlice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        clearState: (state) => {
            state.loading = null;
            state.error = null;
            state.success = null
        }
    },
    extraReducers: (builder) => {
        builder
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
                const token = action.payload.token;
                const decodedUser = jwtDecode<JwtPayload>(token);
                state.userinfo = decodedUser
                state.token = token;
                Helper.setToken(token);
                state.loading = false;
                state.success = true;
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default authSlice.reducer;
export const { clearState } = authSlice.actions;