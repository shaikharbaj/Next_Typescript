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
  attributes: any;
  meta: metaType;
}
const initialState: IInitialState = {
  loading: false,
  attributeunits: [],
  attributes: [],
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
  "attribute/loadattributeunitByID",
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

//edit attribute unite.......
interface IEditAttributeUnitPay {
  name: string;
  category_id: number;
  status: boolean;
  attribute_unit_ID: number;
}
export const editattributeUnitAsync = createAsyncThunk(
  "attribute/editattributeUnit",
  async (payload: IEditAttributeUnitPay, thunkAPI) => {
    try {
      const response = await privateRequest.patch(
        `http://localhost:8000/attributeunit/edit/${payload.attribute_unit_ID}`,
        {
          name: payload.name,
          category_id: payload.category_id,
          status: payload.status,
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  }
);
//delete attribute unit.....
interface IDeleteAttributeUnitPay {
  id: number;
}
export const deleteattributeunitAsync = createAsyncThunk(
  "attribute/deleteattributeunit",
  async (payload: IDeleteAttributeUnitPay, thunkAPI) => {
    try {
      const response = await privateRequest.delete(
        `http://localhost:8000/attributeunit/delete/${payload.id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const changeattributeunitstatusAsync = createAsyncThunk(
  "attribute/changeattributeunitstatus",
  async (payload: IDeleteAttributeUnitPay, thunkAPI) => {
    try {
      const response = await privateRequest.patch(
        `http://localhost:8000/attributeunit/change_status/${payload.id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  }
);

//attribute....................................
interface ICreateAttributePay {
  name: string;
  category_id: number;
  status: boolean;
  required: boolean;
}
export const createAttributeAsync = createAsyncThunk(
  "attribute/createattribute",
  async (payload: ICreateAttributePay, thunkAPI) => {
    try {
      const response = await privateRequest.post(
        "http://localhost:8000/attribute/add",
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

export const getallAtrributeAsync = createAsyncThunk(
  "attribute/getallattribute",
  async (payload: Payload, thunkAPI) => {
    try {
      const response = await privateRequest.get(
        `http://localhost:8000/attribute/all?page=${payload.currentpage}&searchTerm=${payload.searchTerm}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  }
);

//load attribute by id...
interface ILoadSingleAtt {
  id: number;
}
export const loadattributeByIDAsync = createAsyncThunk(
  "attribute/loadattributeByID",
  async (payload: ILoadSingleAtt, thunkAPI) => {
    try {
      const response = await privateRequest.get(
        `http://localhost:8000/attribute/loadattributeById/${payload.id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  }
);

//edit attribute.......
interface IEditAttributePay {
  name: string;
  category_id: number;
  status: boolean;
  attribute_ID: number;
  required: boolean;
}
export const editattributeAsync = createAsyncThunk(
  "attribute/editattribute",
  async (payload: IEditAttributePay, thunkAPI) => {
    try {
      const response = await privateRequest.patch(
        `http://localhost:8000/attribute/edit/${payload.attribute_ID}`,
        {
          name: payload.name,
          category_id: payload.category_id,
          status: payload.status,
          required: payload.required,
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  }
);

//delete attribute unit.....
interface IDeleteAttributePay {
  id: number;
}
export const deleteattributeAsync = createAsyncThunk(
  "attribute/deleteattribute",
  async (payload: IDeleteAttributePay, thunkAPI) => {
    try {
      const response = await privateRequest.delete(
        `http://localhost:8000/attribute/delete/${payload.id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  }
);

//change attribute status.......
export const changeattributestatusAsync = createAsyncThunk(
  "attribute/changeattributestatus",
  async (payload: IDeleteAttributePay, thunkAPI) => {
    try {
      const response = await privateRequest.patch(
        `http://localhost:8000/attribute/change-status/${payload.id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  }
);

//getattributewithvalue
export const getattributewithvalueAsync = createAsyncThunk(
  "attribute/getattributewithvalue",
  async (payload: any, thunkAPI) => {
    try {
      const response = await privateRequest.get(
        `http://localhost:8000/attribute/getattributewithvalue/${payload.id}`
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
      })
      .addCase(changeattributeunitstatusAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(changeattributeunitstatusAsync.fulfilled, (state, action) => {
        state.loading = false;
        const findIndex = state.attributeunits.findIndex(
          (att: any) => att?.id == action?.payload?.data?.id
        );
        state.attributeunits.splice(findIndex, 1, action.payload.data);
      })
      .addCase(changeattributeunitstatusAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(editattributeUnitAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editattributeUnitAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editattributeUnitAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteattributeunitAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteattributeunitAsync.fulfilled, (state, action) => {
        state.loading = false;
        const findIndex = state.attributeunits.findIndex(
          (att: any) => att?.id == action?.payload?.data?.id
        );
        state.attributeunits.splice(findIndex, 1);
      })
      .addCase(deleteattributeunitAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(createAttributeAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createAttributeAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createAttributeAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getallAtrributeAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getallAtrributeAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.attributes = action.payload.data.data;
        state.meta = action.payload.data.meta;
      })
      .addCase(getallAtrributeAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(editattributeAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editattributeAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editattributeAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteattributeAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteattributeAsync.fulfilled, (state, action) => {
        state.loading = false;
        const findIndex = state.attributes.findIndex(
          (att: any) => att?.id == action?.payload?.data?.id
        );
        state.attributes.splice(findIndex, 1);
      })
      .addCase(deleteattributeAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(changeattributestatusAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(changeattributestatusAsync.fulfilled, (state, action) => {
        state.loading = false;
        const findIndex = state.attributes.findIndex(
          (att: any) => att?.id == action?.payload?.data?.id
        );
        state.attributes.splice(findIndex, 1, action.payload.data);
      })
      .addCase(changeattributestatusAsync.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export default attributeSlice.reducer;
export const {} = attributeSlice.actions;
