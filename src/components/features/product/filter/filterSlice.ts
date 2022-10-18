import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  manufacturers: Array<string>;
  tag: string;
  itemType: string;
  sorting: {
    key?: string;
    sortBy?: string;
    direction?: string;
  };
} = { manufacturers: [], tag: "", itemType: "", sorting: {} };

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
      if (state.tag === action.payload) {
        state.tag = "";
        return;
      }

      state.tag = action.payload;
    },
    toggleItemType: (state, action) => {
      if (state.itemType === action.payload) {
        state.itemType = "";
        return;
      }

      state.itemType = action.payload;
    },
    toggleSorting: (state, action) => {
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
