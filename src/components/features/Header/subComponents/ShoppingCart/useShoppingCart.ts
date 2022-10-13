import { useEffect, useState } from "react";

import { LOCAL_STORAGE_KEYS } from "../../../../../utils/constants";
import { Product } from "../../../HomePage";

export type ShoppingCartItem = Pick<Product, "added" | "name" | "price"> & {
  quantity: number;
};

export type ShoppingCart = Array<ShoppingCartItem>;

export const useShoppingCart = () => {
  const [cart, setCart] = useState<ShoppingCart>(() =>
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.shoppingCart) ?? "[]")
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.shoppingCart, JSON.stringify(cart));
  }, [cart]);

  return {
    cart,

    addItem: (item: Omit<ShoppingCartItem, "quantity">) => {
      const existingItem = cart.find(
        (cartItem) => cartItem.added === item.added
      );

      // assuming that we have an infinite supply of items
      if (existingItem) {
        setCart(
          cart.map((cartItem) =>
            cartItem.added === item.added
              ? {
                  ...cartItem,
                  quantity: cartItem.quantity + 1,
                }
              : cartItem
          )
        );
        return;
      }

      setCart([
        ...cart,
        {
          ...item,
          quantity: 1,
        },
      ]);
    },

    removeItem: (itemId: number) => {
      const existingItem = cart.find((cartItem) => cartItem.added === itemId);

      if (!existingItem) {
        // eslint-disable-next-line no-console
        console.error("Item not found in cart");
      }

      if (existingItem && existingItem.quantity === 1) {
        setCart(cart.filter((cartItem) => cartItem.added !== itemId));
        return;
      }

      setCart(
        cart.map((cartItem) =>
          cartItem.added === itemId
            ? {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              }
            : cartItem
        )
      );
    },
  };
};
