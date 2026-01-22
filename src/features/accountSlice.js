import { createSlice } from "@reduxjs/toolkit";
import { sampleAccounts } from "../data/sampleAccounts";

const accountSlice = createSlice({
  name: "accounts",
  initialState: {
    list: sampleAccounts
  },
  reducers: {
    addAccount: (state, action) => {
      state.list.push(action.payload);
    }
  }
});

export const { addAccount } = accountSlice.actions; 
export default accountSlice.reducer;
