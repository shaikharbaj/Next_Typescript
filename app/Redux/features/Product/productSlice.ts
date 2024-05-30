import privateRequest from "@/app/Interceptor/interceptor";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
type InitialState = {
  loading?: boolean | null;
  products: any;
  error: any;
  success: boolean | null;
};
type Payload = {
  currentpage: number;
  perPage: number;
  searchText: string;
};
const initialState: InitialState = {
  loading: null,
  products: [],
  error: null,
  success: null,
};

//get product........
export const loadallproductAsync = createAsyncThunk(
  "products/loadproducts",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:8000/product/all`);
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

interface IloadProductByID {
  id: number;
}
export const loadsingleproductByID = createAsyncThunk(
  "products/loadproductsbyID",
  async (payload: IloadProductByID, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/product/getproductbyID/${payload?.id}`
      );
      const data = await response.data;
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//add product........
export const addproductAsync = createAsyncThunk(
  "products/addproducts",
  async (payload: FormData, thunkAPI) => {
    try {
      const response = await privateRequest.post(
        `http://localhost:8000/product/add`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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
interface ISingleProduct {
  slug: string;
}
export const getsingleproductAsync = createAsyncThunk(
  "product/getsingleproduct",
  async (payload: ISingleProduct, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/product/getsingleproduct/${payload.slug}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//edit product..................
interface IEditPayload {
  id: number;
  data:FormData
}
export const editproductAsync = createAsyncThunk(
  "product/editproduct",
  async (payload: IEditPayload, thunkAPI) => {
    try {
      const response = await privateRequest.patch(
        `http://localhost:8000/product/edit/${payload.id}`,payload.data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadallproductAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadallproductAsync.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.products = action.payload.data;
      })
      .addCase(loadallproductAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addproductAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addproductAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addproductAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getsingleproductAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getsingleproductAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getsingleproductAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(loadsingleproductByID.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadsingleproductByID.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(loadsingleproductByID.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(editproductAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editproductAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editproductAsync.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
