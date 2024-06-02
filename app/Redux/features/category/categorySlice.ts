import privateRequest from "@/app/Interceptor/interceptor";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface IInitialState {
  loading: boolean;
  categories: any;
  activeCategories: any;
  activeSubCategories: any;
  subcategories: any;
}
const initialState: IInitialState = {
  loading: false,
  categories: [],
  activeCategories: [],
  activeSubCategories: [],
  subcategories: [],
};

export const loadCategoriesAsync = createAsyncThunk(
  "categories/loadall",
  async (payload, thunkAPI) => {
    try {
      const response = await privateRequest.get(
        "http://localhost:8000/category/all"
      );
      return await response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        if (errorData.validationerror) {
          // Handle validation errors
          return thunkAPI.rejectWithValue(errorData.validationerror);
        } else {
          // Handle other error messages
          return thunkAPI.rejectWithValue(errorData.message);
        }
      }
    }
  }
);

export const loadAllActiveCategoriesAsync = createAsyncThunk(
  "categories/loadallactivecategories",
  async (payload, thunkAPI) => {
    try {
      const response = await privateRequest.get(
        "http://localhost:8000/category/allactiveCategory"
      );
      return await response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        if (errorData.validationerror) {
          // Handle validation errors
          return thunkAPI.rejectWithValue(errorData.validationerror);
        } else {
          // Handle other error messages
          return thunkAPI.rejectWithValue(errorData.message);
        }
      }
    }
  }
);

interface IAddCategory {
  name: string;
}
export const addCategoryAsync = createAsyncThunk(
  "categories/add",
  async (payload: IAddCategory, thunkAPI) => {
    try {
      const response = await privateRequest.post(
        "http://localhost:8000/category/add",
        payload
      );
      return await response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        if (errorData.validationerror) {
          // Handle validation errors
          return thunkAPI.rejectWithValue(errorData.validationerror);
        } else {
          // Handle other error messages
          return thunkAPI.rejectWithValue(errorData.message);
        }
      }
    }
  }
);

interface IAddSubCategory {
  name: string;
}
export const addsubCategoryAsync = createAsyncThunk(
  "categories/subadd",
  async (payload: IAddSubCategory, thunkAPI) => {
    try {
      const response = await privateRequest.post(
        "http://localhost:8000/category/add/subcategory",
        payload
      );
      return await response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        if (errorData.validationerror) {
          // Handle validation errors
          return thunkAPI.rejectWithValue(errorData.validationerror);
        } else {
          // Handle other error messages
          return thunkAPI.rejectWithValue(errorData.message);
        }
      }
    }
  }
);

export const getcategoryById = createAsyncThunk(
  "category/getcategorybyId",
  async (id: number, thunkAPI) => {
    try {
      const response = await privateRequest.get(
        `http://localhost:8000/category/${id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        if (errorData.validationerror) {
          // Handle validation errors
          return thunkAPI.rejectWithValue(errorData.validationerror);
        } else {
          // Handle other error messages
          return thunkAPI.rejectWithValue(errorData.message);
        }
      }
    }
  }
);

export const getsubcategoryById = createAsyncThunk(
  "category/getsubcategorybyId",
  async (id: number, thunkAPI) => {
    try {
      const response = await privateRequest.get(
        `http://localhost:8000/category/subcategory/${id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        if (errorData.validationerror) {
          // Handle validation errors
          return thunkAPI.rejectWithValue(errorData.validationerror);
        } else {
          // Handle other error messages
          return thunkAPI.rejectWithValue(errorData.message);
        }
      }
    }
  }
);

interface IUpdateCategoryPayload {
  id: number;
  name: string;
}
export const editcategoryAsync = createAsyncThunk(
  "category/editcataegory",
  async (payload: IUpdateCategoryPayload, thunkAPI) => {
    try {
      const response = await privateRequest.patch(
        `http://localhost:8000/category/edit/${payload.id}`,
        { name: payload.name }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        if (errorData.validationerror) {
          // Handle validation errors
          return thunkAPI.rejectWithValue(errorData.validationerror);
        } else {
          // Handle other error messages
          return thunkAPI.rejectWithValue(errorData.message);
        }
      }
    }
  }
);
interface IUpdateSubCategoryPayload {
  id: number;
  parent_id: number;
  name: string;
}
export const editsubcategoryAsync = createAsyncThunk(
  "category/editsubcataegory",
  async (payload: IUpdateSubCategoryPayload, thunkAPI) => {
    try {
      const response = await privateRequest.patch(
        `http://localhost:8000/category/edit/subcategory/${payload.id}`,
        { name: payload.name, parent_id: payload.parent_id }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        if (errorData.validationerror) {
          // Handle validation errors
          return thunkAPI.rejectWithValue(errorData.validationerror);
        } else {
          // Handle other error messages
          return thunkAPI.rejectWithValue(errorData.message);
        }
      }
    }
  }
);

export const deletecategoryAsync = createAsyncThunk(
  "cataegory/delete",
  async (id: number, thunkAPI) => {
    try {
      const response = await privateRequest.delete(
        `http://localhost:8000/category/delete/${id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        if (errorData.validationerror) {
          // Handle validation errors
          return thunkAPI.rejectWithValue(errorData.validationerror);
        } else {
          // Handle other error messages
          return thunkAPI.rejectWithValue(errorData);
        }
      }
      // return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deletesubcategoryAsync = createAsyncThunk(
  "categoty/deletesubcategory",
  async (id: number, thunkAPI) => {
    try {
      const response = await privateRequest.delete(
        `http://localhost:8000/category/delete/subcategory/${id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        if (errorData.validationerror) {
          // Handle validation errors
          return thunkAPI.rejectWithValue(errorData.validationerror);
        } else {
          // Handle other error messages
          return thunkAPI.rejectWithValue(errorData.message);
        }
      }
    }
  }
);
export const loadSubcategoriesAsync = createAsyncThunk(
  "category/getallaubcategory",
  async (payload, thunkAPI) => {
    try {
      const response = await privateRequest.get(
        "http://localhost:8000/category/all/subcataegories"
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        if (errorData.validationerror) {
          // Handle validation errors
          return thunkAPI.rejectWithValue(errorData.validationerror);
        } else {
          // Handle other error messages
          return thunkAPI.rejectWithValue(errorData.message);
        }
      }
    }
  }
);

export const loadActiveSubcategoriesAsync = createAsyncThunk(
  "category/allsubactivecataegories",
  async (payload, thunkAPI) => {
    try {
      const response = await privateRequest.get(
        "http://localhost:8000/category/allsubactivecataegories"
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        if (errorData.validationerror) {
          // Handle validation errors
          return thunkAPI.rejectWithValue(errorData.validationerror);
        } else {
          // Handle other error messages
          return thunkAPI.rejectWithValue(errorData.message);
        }
      }
    }
  }
);
export const loadsubcategoriesofsingleCategory = createAsyncThunk(
  "categories/subofsinglecategory",
  async (id: number, thunkAPI) => {
    try {
      const response = await privateRequest(
        `http://localhost:8000/category/sub_of_single_category/${id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        if (errorData.validationerror) {
          // Handle validation errors
          return thunkAPI.rejectWithValue(errorData.validationerror);
        } else {
          // Handle other error messages
          return thunkAPI.rejectWithValue(errorData.message);
        }
      }
    }
  }
);

export const loadcategoryforFilter = createAsyncThunk(
  "category/loadcategoryforFilter",
  async (payload, thunkAPI) => {
    try {
      const response = await privateRequest.get(
        "http://localhost:8000/category/category-for-filter"
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

interface IToggleCategoryPayload {
  id: number;
}
export const togglecategorystatusAsync = createAsyncThunk(
  "category/togglecategorystatus",
  async (payload: IToggleCategoryPayload, thunkAPI) => {
    try {
      const response = await privateRequest.patch(
        `http://localhost:8000/category/togglecategorystatus/${payload.id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        if (errorData.validationerror) {
          // Handle validation errors
          return thunkAPI.rejectWithValue(errorData.validationerror);
        } else {
          // Handle other error messages
          return thunkAPI.rejectWithValue(errorData);
        }
      }
    }
  }
);

export const togglesubcategorystatusAsync = createAsyncThunk(
  "category/togglesubcategorystatus",
  async (payload: IToggleCategoryPayload, thunkAPI) => {
    try {
        const response = await privateRequest.patch(`http://localhost:8000/category/togglesubcategorystatus/${payload.id}`);
        return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        if (errorData.validationerror) {
          // Handle validation errors
          return thunkAPI.rejectWithValue(errorData.validationerror);
        } else {
          // Handle other error messages
          return thunkAPI.rejectWithValue(errorData);
        }
      }
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCategoriesAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload.data;
        state.loading = false;
      })
      .addCase(loadCategoriesAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(loadAllActiveCategoriesAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadAllActiveCategoriesAsync.fulfilled, (state, action) => {
        state.activeCategories = action.payload.data;
        state.loading = false;
      })
      .addCase(loadAllActiveCategoriesAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addCategoryAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addCategoryAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addCategoryAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getcategoryById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getcategoryById.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getcategoryById.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(editcategoryAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editcategoryAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editcategoryAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deletecategoryAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deletecategoryAsync.fulfilled, (state, action) => {
        state.loading = false;
        const Index = state.categories.findIndex(
          (c: any) => Number(c.id) === Number(action.payload.data.id)
        );
        state.categories.splice(Index, 1);
      })
      .addCase(deletecategoryAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(loadSubcategoriesAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadSubcategoriesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories = action.payload.data;
      })
      .addCase(loadSubcategoriesAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(loadActiveSubcategoriesAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadActiveSubcategoriesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.activeSubCategories = action.payload.data;
      })
      .addCase(loadActiveSubcategoriesAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(loadsubcategoriesofsingleCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadsubcategoriesofsingleCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories = action.payload.data;
      })
      .addCase(loadsubcategoriesofsingleCategory.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deletesubcategoryAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deletesubcategoryAsync.fulfilled, (state, action) => {
        state.loading = false;
        const Index = state.subcategories.findIndex(
          (c: any) => Number(c.id) === Number(action.payload.data.id)
        );
        state.subcategories.splice(Index, 1);
      })
      .addCase(deletesubcategoryAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(loadcategoryforFilter.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadcategoryforFilter.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(loadcategoryforFilter.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(togglecategorystatusAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(togglecategorystatusAsync.fulfilled, (state, action) => {
        state.loading = false;
        let newData = state.categories.map((u: any) => {
          if (Number(u.id) === Number(action.payload.data.id)) {
            return action.payload.data;
          }
          return u;
        });
        state.categories = newData;
      })
      .addCase(togglecategorystatusAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(togglesubcategorystatusAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(togglesubcategorystatusAsync.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload.data);
        let newData = state.subcategories.map((u: any) => {
          if (Number(u.id) === Number(action.payload.data.id)) {
            return action.payload.data;
          }
          return u;
        });
        state.subcategories = newData;
      })
      .addCase(togglesubcategorystatusAsync.rejected, (state, action) => {
        state.loading = false;
      })
      ;
  },
});

export default categorySlice.reducer;
