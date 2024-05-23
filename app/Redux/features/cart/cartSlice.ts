import privateRequest from "@/app/Interceptor/interceptor";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IinitialState {
  cartItem: any;
  loading: boolean;
}
const initialState: IinitialState = {
  loading: false,
  cartItem: [],
};

interface IAddtoCartPayload {
  product_id: number;
  quantity?: number;
}
//add product to cart....
export const addproducttocartAsync = createAsyncThunk(
  "cart/add_to_cart",
  async (payload: IAddtoCartPayload, thunkAPI) => {
    try {
      const response = await privateRequest.post(
        "http://localhost:8000/cart/add_to_cart",
        payload
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//get all cart products......
export const loadcartAsync = createAsyncThunk(
  "cart/loadcart",
  async (payload, thunkAPI) => {
    try {
      const response = await privateRequest.get(
        "http://localhost:8000/cart/all"
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
interface IdecrementQuantityPayload {
  product_id: number;
}
export const decrementQuantityAsync = createAsyncThunk(
  "cart/decrementquantity",
  async (payload: IdecrementQuantityPayload, thunkAPI) => {
    try {
      const response = await privateRequest.patch(
        `http://localhost:8000/cart/decrement_quantity/${payload.product_id}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const incrementQuantityAsync = createAsyncThunk(
  "cart/incrementquantity",
  async (payload: IdecrementQuantityPayload, thunkAPI) => {
    try {
      const response = await privateRequest.patch(
        `http://localhost:8000/cart/increment_quantity/${payload.product_id}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeproductfromcartAsync = createAsyncThunk(
  "cart/removeproduct",
  async (payload: IdecrementQuantityPayload, thunkAPI) => {
    try {
      const response = await privateRequest.delete(
        `http://localhost:8000/cart/removeproduct/${payload.product_id}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadcartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadcartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItem = action.payload.data;
      })
      .addCase(loadcartAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addproducttocartAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addproducttocartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItem.push(action.payload.data);
      })
      .addCase(addproducttocartAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(decrementQuantityAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(decrementQuantityAsync.fulfilled, (state, action) => {
        state.loading = false;
        //find index of element................
        const index = state.cartItem.findIndex(
          (ele: any) => ele?.product.id === action.payload.data.productId
        );
        if (action.payload.data.quantity === 0) {
          // console.log("removed");
          state.cartItem.splice(index, 1);
        } else {
          state.cartItem[index].quantity -= 1;
        }
      })
      .addCase(decrementQuantityAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(incrementQuantityAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(incrementQuantityAsync.fulfilled, (state, action) => {
        state.loading = false;
        //find index of element..
        const index = state.cartItem.findIndex(
          (ele: any) => ele?.product.id === action.payload.data.productId
        );
        state.cartItem[index].quantity += 1;
      })
      .addCase(incrementQuantityAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(removeproductfromcartAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(removeproductfromcartAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.cartItem.findIndex(
          (ele: any) => ele?.product.id === action.payload.data.productId
        );
        state.cartItem.splice(index, 1);
      })
      .addCase(removeproductfromcartAsync.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default cartSlice.reducer;
export const {} = cartSlice.actions;
