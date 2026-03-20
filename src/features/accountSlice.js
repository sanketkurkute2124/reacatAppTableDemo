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
    },
    removeAccount: (state, action) => {
      const email = action.payload;
      state.list = state.list.filter((item) => item.email !== email);
    },
    updateAccount: (state, action) => {
      const updated = action.payload;
      state.list = state.list.map((item) =>
        item.email === updated.email ? { ...item, ...updated } : item
      );
    }
  }
});

export const { addAccount, removeAccount, updateAccount } = accountSlice.actions; 
export default accountSlice.reducer;
