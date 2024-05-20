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
  currentpage: number,
  perPage: number,
  searchText: string
}
const initialState: InitialState = {
  loading: null,
  products: [],
  error: null,
  success: null,
};

//get product........
export const loadallproductAsync = createAsyncThunk("products/loadproducts", async (payload, thunkAPI) => {
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
})

//add product........
export const addproductAsync = createAsyncThunk("products/addproducts", async (payload: FormData, thunkAPI) => {
  try {
    const response = await privateRequest.post(`http://localhost:8000/product/add`, payload);
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
})


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
  },
});

export default productSlice.reducer;
