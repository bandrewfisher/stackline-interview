import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types";

export const salesDataSlice = createSlice({
  name: "salesData",
  initialState: {
    products: [] as Product[],
  },
  reducers: {
    setSalesData: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
});

export const { setSalesData } = salesDataSlice.actions;

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default salesDataSlice.reducer;
