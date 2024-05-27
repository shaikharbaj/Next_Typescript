import privateRequest from "@/app/Interceptor/interceptor";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  loading: boolean;
  orders: any;
}
const initialState: IInitialState = {
  loading: false,
  orders: [],
};

export const getallordersofcustomerAsync = createAsyncThunk(
  "order/getallorderofcustomer",
  async (payload, thunkAPI) => {
    try {
      const response = await privateRequest.get(
        "http://localhost:8000/order/getallorderofcustomer"
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getallordersofcustomerAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getallordersofcustomerAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getallordersofcustomerAsync.pending, (state, action) => {
        state.loading = false;
      });
  },
});
