import privateRequest from "@/app/Interceptor/interceptor";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


interface IinitialState {
    cartItem: [],
    loading: boolean
}
const initialState: IinitialState = {
    loading: false,
    cartItem: []
}

interface IAddtoCartPayload{
      product_id:number,
      quantity?:number
}
//add product to cart....
export const addproducttocartAsync = createAsyncThunk("cart/add_to_cart", async (payload:IAddtoCartPayload, thunkAPI) => {
    try {
          const response = await privateRequest.post("http://localhost:8000/cart/add_to_cart",payload);
          return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        //  .addCase()
    }
})

export default cartSlice.reducer;
export const { } = cartSlice.actions;