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
interface IInitialState {
  loading: boolean;
  attributeunits: any;
  meta: metaType;
}
const initialState: IInitialState = {
  loading: false,
  attributeunits: [],
  meta: {
    total: 0,
    lastPage: 0,
    currentPage: 1,
    perPage: 0,
    prev: null,
    next: null,
  },
};

//for admin panel
//load all attribute unit
//create attribute unit..
interface ICreateAttributeUnitPay {
  name: string;
  category_id: number;
  status: boolean;
}
export const createAttributeUnitsAsync = createAsyncThunk(
  "attribute/createattributeunit",
  async (payload: ICreateAttributeUnitPay, thunkAPI) => {
    try {
      const response = await privateRequest.post(
        "http://localhost:8000/attributeunit/add",
        payload
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  }
);
type Payload = {
  currentpage: number;
  searchTerm: string;
};
export const getallAtrributeUnitsAsync = createAsyncThunk(
  "attribute/getallattributeunits",
  async (payload: Payload, thunkAPI) => {
    try {
      const response = await privateRequest.get(
        `http://localhost:8000/attributeunit/all?page=${payload.currentpage}&searchTerm=${payload.searchTerm}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  }
);

//load single attributeunit
interface ILoadSingleAttUnit {
  id: number;
}
export const loadattributeunitByID = createAsyncThunk(
  "",
  async (payload: ILoadSingleAttUnit, thunkAPI) => {
    try {
      const response = await privateRequest.get(
        `http://localhost:8000/attributeunit/loadattributeuniteById/${payload.id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  }
);

const attributeSlice = createSlice({
  name: "attribute",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAttributeUnitsAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createAttributeUnitsAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createAttributeUnitsAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getallAtrributeUnitsAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getallAtrributeUnitsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.attributeunits = action.payload.data.data;
        state.meta = action.payload.data.meta;
      })
      .addCase(getallAtrributeUnitsAsync.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export default attributeSlice.reducer;
export const {} = attributeSlice.actions;
