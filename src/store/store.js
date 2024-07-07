import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import postSlice from "./postSlice";

const Store = configureStore({
    reducer: {
        auth : authSlice,
        posts : postSlice
    }
})

export default Store;