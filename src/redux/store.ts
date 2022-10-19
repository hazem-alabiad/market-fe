import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
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

import { shoppingCartReducer } from "../components/features/header/shoppingCart/shoppingCartSlice";
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

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: combineReducers({
      [serverApi.reducerPath]: serverApi.reducer,
      shoppingCart: persistedShoppingCartReducer,
      filters: persistentFilterReducer,
    }),
    preloadedState,
  });

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppStore = ReturnType<typeof setupStore>;

export const persistor = persistStore(store);
