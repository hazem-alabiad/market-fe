import { createSlice } from "@reduxjs/toolkit";

import { ItemType } from "../../../../services/serverApi";

const initialState: {
  manufacturers: Array<string>;
  tag: Array<string>;
  itemType: ItemType | null;
  sorting: {
    key: string;
    sortBy: string;
    direction: string;
  } | null;
} = { manufacturers: [], tag: [], itemType: null, sorting: null };

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleManufacturer: (state, action) => {
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
    toggleTag: (state, action) => {
      const tag = state.tag.findIndex((item) => item === action.payload);

      if (tag === -1) {
        state.tag.push(action.payload);
        return;
      }

      state.tag.splice(
        state.tag.findIndex((item) => item === action.payload),
        1
      );
    },
    toggleItemType: (state, action) => {
      if (state.itemType === action.payload) {
        state.itemType = null;
        return;
      }

      state.itemType = action.payload;
    },
    toggleSorting: (state, action) => {
      if (state.sorting.key === action.payload.key) {
        state.sorting = null;
        return;
      }

      state.sorting = action.payload;
    },
  },
});

export const filterReducer = filterSlice.reducer;

export const { toggleManufacturer, toggleTag, toggleItemType, toggleSorting } =
  filterSlice.actions;
