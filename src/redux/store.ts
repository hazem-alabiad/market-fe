import { configureStore } from "@reduxjs/toolkit";
import ReactRedux, { TypedUseSelectorHook } from "react-redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { shoppingCartReducer } from "../components/features/pagination/header/shoppingCart/shoppingCartSlice";
import { filterReducer } from "../components/features/product/filter/filterSlice";
import { serverApi } from "../services/serverApi";

const persistedShoppingCartReducer = persistReducer(
  {
    key: "shoppingCart",
    storage,
  },
  shoppingCartReducer
);

const persistentFilterReducer = persistReducer(
  {
    key: "filters",
    storage,
  },
  filterReducer
);

export const store = configureStore({
  reducer: {
    [serverApi.reducerPath]: serverApi.reducer,
    shoppingCart: persistedShoppingCartReducer,
    filters: persistentFilterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(serverApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = ReactRedux.useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> =
  ReactRedux.useSelector;

export const persistor = persistStore(store);
