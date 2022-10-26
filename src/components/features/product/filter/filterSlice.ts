import { createSlice } from "@reduxjs/toolkit";
import { Key } from "react";

const initialState: {
  manufacturers: Array<string>;
  tag: string;
  itemType: Key | null;
  sorting: {
    key?: Key | null;
    sortBy?: string | null;
    direction?: string | null;
  };
} = { manufacturers: [], tag: "", itemType: "", sorting: {} };

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleManufacturer: (
      state,
      action: {
        type: string;
        payload: string;
      }
    ) => {
      const manufacturer = state.manufacturers.findIndex(
        (item) => item === action.payload
      );

      if (manufacturer === -1) {
        state.manufacturers.push(action.payload);
        return;
      }

      state.manufacturers.splice(
        state.manufacturers.findIndex((item) => item === action.payload),
        1
      );
    },
    toggleTag: (
      state,
      action: {
        type: string;
        payload: string;
      }
    ) => {
      if (state.tag === action.payload) {
        state.tag = "";
        return;
      }

      state.tag = action.payload;
    },
    toggleItemType: (
      state,
      action: {
        type: string;
        payload: Key | null;
      }
    ) => {
      if (state.itemType === action.payload) {
        state.itemType = "";
        return;
      }

      state.itemType = action.payload;
    },
    toggleSorting: (
      state,
      action: {
        type: string;
        payload: { key?: Key; sortBy?: string; direction?: string };
      }
    ) => {
      if (state.sorting?.key === action.payload.key) {
        state.sorting = {};
        return;
      }

      state.sorting = action.payload;
    },
  },
});

export const filterReducer = filterSlice.reducer;

export const { toggleManufacturer, toggleTag, toggleItemType, toggleSorting } =
  filterSlice.actions;
