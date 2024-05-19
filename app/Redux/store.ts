import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import productReducer from "./features/Product/productSlice";
import userReducer from "./features/user/userSlice";
import roleReducer from "./features/role/roleSlice";
import profileReducer from "./features/profile/profileSlice";
import adminReducer from "./features/admin/adminSlice";
import bannerReducer from "./features/Banner/bannerSlice";
import categoryReducer from "./features/category/categorySlice";
import blogReducer from "./features/blog/blogSlice";
import supplierReducer from "./features/supplier/supplierSlice";
const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        users: userReducer,
        role: roleReducer,
        profile: profileReducer,
        admin: adminReducer,
        banner: bannerReducer,
        category: categoryReducer,
        blog: blogReducer,
        supplier:supplierReducer
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

