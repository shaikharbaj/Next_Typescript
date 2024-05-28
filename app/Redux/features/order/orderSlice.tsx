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
interface IGetOrderByID {
  id: number;
}
export const getorderbyIdAsync = createAsyncThunk(
  "order/getorderbyId",
  async (payload: IGetOrderByID, thunkAPI) => {
    try {
      const response = await privateRequest.get(
        `http://localhost:8000/order/getorderbyid/${payload.id}`
      );
      return response.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
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
        state.orders = action.payload.data;
        // console.log(action.payload.data);
      })
      .addCase(getallordersofcustomerAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getorderbyIdAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getorderbyIdAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getorderbyIdAsync.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default orderSlice.reducer;
export const {} = orderSlice.actions;
