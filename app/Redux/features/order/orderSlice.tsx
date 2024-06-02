import privateRequest from "@/app/Interceptor/interceptor";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
      if (axios.isAxiosError(error) && error.response) {
        if (error.response && error.response.data.message) {
          return thunkAPI.rejectWithValue(error.response.data);
        }
      }
      // Handle other errors not related to Axios
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

//generate invoice...................
interface IGenerateInvoicePay {
  order_id: number
}
export const generate_invoiceAsync = createAsyncThunk("order/generateinvoice", async (payload: IGenerateInvoicePay, thunkAPI) => {
  try {
    const response = await privateRequest.get(`http://localhost:8000/order/generate_invoice/${payload.order_id}`, {
      responseType: "blob"
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `invoice_${payload.order_id}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
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
export const { } = orderSlice.actions;
