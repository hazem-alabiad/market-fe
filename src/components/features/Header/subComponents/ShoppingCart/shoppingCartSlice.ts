import { createSlice } from "@reduxjs/toolkit";

import { ShoppingCartItem } from "./useShoppingCart";

const initialState: { items: Array<ShoppingCartItem> } = { items: [] };

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // assuming that we have an infinite supply of items

      const itemInCart = state.items.find(
        (item) => item.added === action.payload.added
      );

      if (itemInCart) {
        itemInCart.quantity++;
        return;
      }

      state.items.push({ ...action.payload, quantity: 1 });
    },
    removeFromCart: (state, action) => {
      const itemInCart = state.items.find(
        (item) => item.added === action.payload.itemId
      );

      if (!itemInCart) {
        // eslint-disable-next-line no-console
        console.error("Item not found in cart");
        return;
      }

      if (itemInCart && itemInCart.quantity === 1) {
        // eslint-disable-next-line no-param-reassign
        state.items = state.items.filter(
          (item) => item.added !== action.payload.itemId
        );
        return;
      }

      itemInCart.quantity--;
    },
  },
});

export const shoppingCartReducer = shoppingCartSlice.reducer;

export const { addToCart, removeFromCart } = shoppingCartSlice.actions;
