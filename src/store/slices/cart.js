import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart_items: [],
    total: 0,
    total_items: 0,
  },

  reducers: {
    delCart: (state, action) => {
      state.cart_items = state.cart_items.filter(
        (ele) => ele.id !== action.payload.id
      );
    },
    addCart: (state, action) => {
      state.cart_items.push(action.payload);
      state.total_items = state.total_items + action.payload.qty;
    },
    assignArr: (state, action) => {
      state.cart_items = action.payload;
    },
    addTotal: (state, action) => {
      state.total = state.total + action.payload;
    },
    delTotal: (state, action) => {
      state.total = state.total - action.payload;
    },
    addItems: (state) => {
      state.total_items = state.total_items + 1;
    },
    delItems: (state, action) => {
      if (state.total_items !== 0) {
        state.total_items = state.total_items - action.payload;
      }
    },
  },
});

export const {
  delCart,
  addCart,
  assignArr,
  addTotal,
  delTotal,
  addItems,
  delItems,
} = cartSlice.actions;

export default cartSlice.reducer;
