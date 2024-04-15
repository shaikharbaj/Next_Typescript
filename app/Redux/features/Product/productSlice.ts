import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
type InitialState = {
  loading?: boolean | null;
  products: any;
  error: any;
  success: boolean | null;
};
type Payload={
        currentpage:number,
        perPage:number,
        searchText:string
}
const initialState: InitialState = {
  loading: null,
  products: [],
  error: null,
  success: null,
};

//get product........
export const loadproductAsync = createAsyncThunk("products/loadproducts", async (payload:Payload, thunkAPI) => {
    try {
        const { currentpage, perPage, searchText } = payload;
        const response = await axios.get(`https://dummyjson.com/products/search?q=${searchText}&limit=${perPage}&skip=${(currentpage - 1) * perPage}`);
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
      .addCase(loadproductAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadproductAsync.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(loadproductAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
