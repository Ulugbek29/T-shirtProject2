import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    userData: {
      comment: "",
      address: ""
    }
  },
  reducers: {
    setUserOrder(state, { payload }) {
        return {
          ...state,
          userData: {
            ...state.userData,
            ...payload
          }
        };
      },
    clearUserData(state, {payload}) {
        state.userData = {}
    }
}
});

export default orderSlice.reducer;

export const { setUserOrder,clearUserData } = orderSlice.actions;
