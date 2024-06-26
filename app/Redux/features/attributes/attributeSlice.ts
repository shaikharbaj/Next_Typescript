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
  activeAttributes: any;
  activeAttributeUnit: any;
  activeAttributeValue: any;
  meta: metaType;
}
const initialState: IInitialState = {
  loading: false,
  attributeunits: [],
  attributes: [],
  activeAttributes: [],
  activeAttributeUnit: [],
  activeAttributeValue: [],
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

//create attribute value..................
interface ICreateAttributeValuePayload {
  attributes_id: number;
  status: boolean;
  attributevalueName: string;
  attributeunit_id: number;
}
export const createAttributeValueAsync = createAsyncThunk(
  "attribute/createattributevalue",
  async (payload: ICreateAttributeValuePayload, thunkAPI) => {
    try {
      const response = await privateRequest.post(
        `http://localhost:8000/attributevalue/create`,
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

//get attribute value by id
interface IGetattributevaluePay {
  id: number;
}
export const getattributevalueByIdAsync = createAsyncThunk(
  "attribute/getattributevaluebyId",
  async (payload: IGetattributevaluePay, thunkAPI) => {
    try {
      const response = await privateRequest.get(
        `http://localhost:8000/attributevalue/getattributevaluebyid/${payload.id}`
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
interface IEditAttributeValuePay {
  id: number;
  attributevalueName: string;
  status: boolean;
  attributes_id: number;
  attributeunit_id: number;
}
export const editattributevalueAsync = createAsyncThunk(
  "attribute/editattributevalue",
  async (payload: IEditAttributeValuePay, thunkAPI) => {
    try {
      const response = await privateRequest.patch(
        `http://localhost:8000/attributevalue/edit/${payload.id}`,
        {
          name: payload.attributevalueName,
          status: payload.status,
          attributes_id: payload.attributes_id,
          attributeunit_id: payload.attributeunit_id,
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

//change status of attribute value..........................
interface IUpdateAttributeValueStatus {
  id: number;
}
export const changestatus_attributevalueAsync = createAsyncThunk(
  "attribute/changeattributevaluestatus",
  async (payload: IUpdateAttributeValueStatus, thunkAPI) => {
    try {
      const response = await privateRequest.patch(
        `http://localhost:8000/attributevalue/changestatus/${payload.id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const delete_attributevalueAsync = createAsyncThunk(
  "attribute/deleteattributevaluestatus",
  async (payload: IUpdateAttributeValueStatus, thunkAPI) => {
    try {
      const response = await privateRequest.delete(
        `http://localhost:8000/attributevalue/delete/${payload.id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  }
);

interface IGetAttributeByCategory_Id {
  categoty_id: number;
}
export const getattributeby_categoryid = createAsyncThunk(
  "attribute/getattributebycategory_id",
  async (payload: IGetAttributeByCategory_Id, thunkAPI) => {
    try {
      const response = await privateRequest.get(
        `http://localhost:8000/attribute/getactiveattribute_by_category_id/${payload.categoty_id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  }
);

interface IGetAttributeUnitByCategory_Id {
  categoty_id: number;
}
export const getattributeunitby_categoryid = createAsyncThunk(
  "attribute/getattributeunitbycategory_id",
  async (payload: IGetAttributeUnitByCategory_Id, thunkAPI) => {
    try {
      const response = await privateRequest.get(
        `http://localhost:8000/attributeunit/getattributeunitby_categoty_id/${payload.categoty_id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  }
);

interface IGetAttributeValueByAttribute_Id {
  attribute_id: number;
}
export const getattributevalueby_attributeid = createAsyncThunk(
  "attribute/getattributevaluebyattribute_id",
  async (payload: IGetAttributeValueByAttribute_Id, thunkAPI) => {
    try {
      const response = await privateRequest.get(
        `http://localhost:8000/attributevalue/getactiveattributevaluebyid/${payload.attribute_id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  }
);

interface Iget_variation_options {
  category_id: number
}
export const get_variation_optionsAsync = createAsyncThunk(
  "attribute/getvariationoption",
  async (payload: Iget_variation_options, thunkAPI) => {
    try {
      const response = await privateRequest.get(
        `http://localhost:8000/category/getvariationoption/${payload.category_id}`
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
      })
      .addCase(createAttributeValueAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createAttributeValueAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createAttributeValueAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(editattributevalueAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editattributevalueAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editattributevalueAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(changestatus_attributevalueAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(changestatus_attributevalueAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(changestatus_attributevalueAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getattributeby_categoryid.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getattributeby_categoryid.fulfilled, (state, action) => {
        state.loading = false;
        state.activeAttributes = action.payload.data;
      })
      .addCase(getattributeby_categoryid.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getattributeunitby_categoryid.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getattributeunitby_categoryid.fulfilled, (state, action) => {
        state.loading = false;
        state.activeAttributeUnit = action.payload.data;
      })
      .addCase(getattributeunitby_categoryid.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getattributevalueby_attributeid.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getattributevalueby_attributeid.fulfilled, (state, action) => {
        state.loading = false;
        state.activeAttributeValue = action.payload.data;
      })
      .addCase(getattributevalueby_attributeid.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(get_variation_optionsAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(get_variation_optionsAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(get_variation_optionsAsync.rejected, (state, action) => {
        state.loading = false;
      })
  },
});
export default attributeSlice.reducer;
export const { } = attributeSlice.actions;
