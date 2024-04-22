import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import productReducer from "./features/Product/productSlice";
import userReducer from "./features/user/userSlice";
import roleReducer from "./features/role/roleSlice";
const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        users: userReducer,
        role: roleReducer
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

