import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart";

export default configureStore({
  reducer: {
    cart: cartSlice,
  },
});

// configureStore => reducer
// Slice => name , initialState , reducers
// reducers => functions => state, action => update state
// from slice => export const { reducerFunctions } = slice.actions => component
// from slice => export defult slice.reducer => configureStore
