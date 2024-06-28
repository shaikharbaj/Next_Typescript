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
type InitialState = {
  loading?: boolean | null;
  products: any;
  error: any;
  success: boolean | null;
  meta: metaType;
};
const initialState: InitialState = {
  loading: null,
  products: [],
  error: null,
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

//get product........
type Payload = {
  currentpage: number;
  searchTerm: string;
};
export const loadallproductAsync = createAsyncThunk(
  "products/loadproducts",
  async (payload: Payload, thunkAPI) => {
    try {
      const { currentpage, searchTerm } = payload;
      const response = await axios.get(
        `http://localhost:8000/product/allproduct?page=${currentpage}&searchTerm=${searchTerm}`
      );
      console.log(response.data);
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
  data: FormData;
}
export const editproductAsync = createAsyncThunk(
  "product/editproduct",
  async (payload: IEditPayload, thunkAPI) => {
    try {
      const response = await privateRequest.patch(
        `http://localhost:8000/product/edit/${payload.id}`,
        payload.data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//varients....................
interface IAddProductVarient {
  product_id: number;
  variants: any;
}
export const addproductVarientAsync = createAsyncThunk(
  "product/addproductvarient",
  async (payload: IAddProductVarient, thunkAPI) => {
    try {
      const response = await privateRequest.post(
        "http://localhost:8000/product/add-varient",
        payload
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

interface IGetProductVarient {
  product_id: number;
  varient_id: number;
}
export const get_product_varient_details = createAsyncThunk(
  "product/product-varient-detail",
  async (payload: IGetProductVarient, thunkAPI) => {
    try {
      const response = await privateRequest.post(
        "http://localhost:8000/product/get-product-variant-detail",
        payload
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const uploadproductvarient_images = createAsyncThunk(
  "product/uploadvarientimage",
  async (payload: FormData, thunkAPI) => {
    try {
      const response = await privateRequest.post(
        "http://localhost:8000/product/add-product-varient-image",
        payload
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

interface IGetproductDetails {
  slug: string;
}
export const getproductdetails = createAsyncThunk(
  "product/getproductdetails",
  async (payload: IGetproductDetails, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/product/productdetails/${payload.slug}`
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
        // state.products = action.payload.data.data;
        state.products = action.payload.data;
        // state.meta = action.payload.data.meta;
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
      })
      .addCase(get_product_varient_details.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(get_product_varient_details.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(get_product_varient_details.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(uploadproductvarient_images.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(uploadproductvarient_images.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(uploadproductvarient_images.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
