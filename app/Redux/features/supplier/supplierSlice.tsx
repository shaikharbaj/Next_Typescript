import privateRequest from "@/app/Interceptor/interceptor";
import Helper from "@/app/utils/helper";
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
interface IInitialState {
  loading: boolean;
  products: [];
  orders: any;
  meta: metaType;
}
const initialState: any = {
  loading: false,
  products: [],
  orders: [],
  userinfo: Helper.getUser() || null,
  token: Helper.getLocalToken() || null,
  meta: {
    total: 0,
    lastPage: 0,
    currentPage: 1,
    perPage: 0,
    prev: null,
    next: null,
  },
};

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

type Payload = {
  currentpage: number;
  searchTerm: string;
};

export const loadallsupplierproductAsync = createAsyncThunk(
  "suplier/loadallsupplierproducts",
  async (payload: Payload, thunkAPI) => {
    try {
      const { currentpage, searchTerm } = payload;
      const response = await privateRequest.get(
        `http://localhost:8000/product/supplier/all?page=${currentpage}&searchTerm=${searchTerm}`
      );
      const data = await response.data;
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        if (error.response && error.response.data.message) {
          // Handle validation errors
          return thunkAPI.rejectWithValue(error.message);
        }
      }
      // Handle other errors not related to Axios
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);
export const loadallsupplierordersAsync = createAsyncThunk(
  "supplier/loadallsupplierproducts",
  async (payload: Payload, thunkAPI) => {
    try {
      const { currentpage, searchTerm } = payload;
      const response = await privateRequest(
        `http://localhost:8000/order/loadallsupplierorders?page=${currentpage}&searchTerm=${searchTerm}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
interface IdeleteproductPayload {
  product_id: number
}
export const deleteproductAsync = createAsyncThunk("supplier/deleteproduct", async (payload: IdeleteproductPayload, thunkAPI) => {
  try {
    const response = await privateRequest.delete(`http://localhost:8000/product/delete/${payload.product_id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
    // Handle other errors not related to Axios
    return thunkAPI.rejectWithValue("An unknown error occurred");
  }
})

interface IloadsinglesupplierOrder {
  orderItemId: number;
}
export const loadsinglesupplierOrderAsync = createAsyncThunk(
  "supplier/loadsinglesupplierorder",
  async (payload: IloadsinglesupplierOrder, thunkAPI) => {
    try {
      const response = await privateRequest.get(
        `http://localhost:8000/order/loadsinglesupplierorder/${payload?.orderItemId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

interface IUpdateorderstatus {
  orderItemId: number;
  status: string;
  paymentStatus: string;
}
export const updateorderstatusAsync = createAsyncThunk(
  "supplier/updateorderstatus",
  async (payload: IUpdateorderstatus, thunkAPI) => {
    try {
      const response = await privateRequest.patch(
        `http://localhost:8000/order/updateorderstatus`, payload
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginsupplierAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginsupplierAsync.fulfilled, (state, action) => {
        console.log(action.payload.token);
        const token = action.payload.token;
        state.userinfo = action.payload.data;
        state.token = token;
        Helper.setToken(action.payload.token);
        state.loading = false;
      })
      .addCase(loginsupplierAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(loadallsupplierproductAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadallsupplierproductAsync.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.data);
        state.products = action.payload.data.data;
        state.meta = action.payload.data.meta;
      })
      .addCase(loadallsupplierproductAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(loadallsupplierordersAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadallsupplierordersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data.data;
        state.meta = action.payload.data.meta;
      })
      .addCase(loadallsupplierordersAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(loadsinglesupplierOrderAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadsinglesupplierOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(loadsinglesupplierOrderAsync.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default supplierSlice.reducer;
