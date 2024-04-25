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
type initialStateType = {
  loading: boolean;
  meta: metaType;
  banners: any;
};
const initialState: initialStateType = {
  loading: false,
  banners: [],
  meta: {
    total: 0,
    lastPage: 0,
    currentPage: 1,
    perPage: 0,
    prev: null,
    next: null,
  },
};

export const addbannerAsync = createAsyncThunk(
  "banner/addbanner",
  async (payload: FormData, thunkAPI) => {
    try {
      const response = await privateRequest.post(
        "http://127.0.0.1:8000/banner/add",
        payload
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response && error.response.data.message) {
          return thunkAPI.rejectWithValue(error.response.data.message);
        }
      }
      // Handle other errors not related to Axios
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const deletebannerAsync = createAsyncThunk(
  "banner/deletebanner",
  async (id: number, thunkAPI) => {
    try {
      const response = await privateRequest.delete(
        `http://127.0.0.1:8000/banner/delete/${id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response && error.response.data.message) {
          return thunkAPI.rejectWithValue(error.response.data.message);
        }
      }
      // Handle other errors not related to Axios
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);
interface IEditBannerPayload {
  id: number;
  formdata: FormData;
}
export const editbannerAsync = createAsyncThunk(
  "banner/edit",
  async (payload: IEditBannerPayload, thunkAPI) => {
    try {
      const response = await privateRequest.patch(
        `http://127.0.0.1:8000/banner/edit/${payload.id}`,
        payload.formdata
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response && error.response.data.message) {
          return thunkAPI.rejectWithValue(error.response.data.message);
        }
      }
      // Handle other errors not related to Axios
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);
interface ILoadBanner {
  currentpage: number;
  searchTerm: string;
}
export const loadAllBanners = createAsyncThunk(
  "banner/loadallbanners",
  async (payload: ILoadBanner, thunkAPI) => {
    try {
      const response = await privateRequest.get(
        `http://localhost:8000/banner?page=${payload.currentpage}&searchTerm=${payload.searchTerm}`
      );
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response && error.response.data.message) {
          return thunkAPI.rejectWithValue(error.response.data.message);
        }
      }
      // Handle other errors not related to Axios
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export const loadBannerByIdAsync = createAsyncThunk(
  "banner/getbannerbyID",
  async (id: number, thunkAPI) => {
    try {
      const response = await privateRequest.get(
        `http://localhost:8000/banner/${id}`
      );
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response && error.response.data.message) {
          return thunkAPI.rejectWithValue(error.response.data.message);
        }
      }
      // Handle other errors not related to Axios
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

const bannerSlice = createSlice({
  initialState,
  name: "banner",
  reducers: {
    clearstate: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAllBanners.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadAllBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(loadAllBanners.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addbannerAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addbannerAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload.data;
      })
      .addCase(addbannerAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deletebannerAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deletebannerAsync.fulfilled, (state, action) => {
        state.loading = false;
        const deletedData = action.payload.data;
        let newData = state.banners.filter((u: any) => u.id !== deletedData.id);
        state.banners = newData;
      })
      .addCase(deletebannerAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(loadBannerByIdAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadBannerByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(loadBannerByIdAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(editbannerAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editbannerAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(editbannerAsync.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default bannerSlice.reducer;
export const { clearstate } = bannerSlice.actions;
