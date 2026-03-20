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
    }
  }
});

export const { addAccount, removeAccount } = accountSlice.actions; 
export default accountSlice.reducer;
