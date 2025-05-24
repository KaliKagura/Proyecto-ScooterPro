import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './carrito';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        // user: ...
    }
})