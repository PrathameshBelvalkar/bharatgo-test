import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          image: newItem.images[0],
        });
      }
      state.totalQuantity++;
      state.totalPrice += newItem.price;
    },
    incrementQuantity(state, action) {
      const itemId = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item) {
        item.quantity++;
        item.totalPrice += item.price;
        state.totalQuantity++;
        state.totalPrice += item.price;
      }
    },
    decrementQuantity(state, action) {
      const itemId = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity--;
        item.totalPrice -= item.price;
        state.totalQuantity--;
        state.totalPrice -= item.price;
      }
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
