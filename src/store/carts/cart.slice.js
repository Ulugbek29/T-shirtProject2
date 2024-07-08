import { createSlice,current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    addToCart(state, { payload }) {
      const { selectedAttributes } = payload;

      selectedAttributes?.forEach(att => {
        if (att.sale) {
          att.selectedOptions.forEach(opt => {
            const itemIndex = state.items.findIndex(
              (itemObj) =>
                itemObj.item.id === payload.id && itemObj.option.id === opt.id
            );

            if (itemIndex === -1) {
              state.items.push({
                item: payload,
                option: opt,
                // quantity: opt.quantity || 1,
              });
            }
          });
        }
      });
    },

    incrementQuantity(state, { payload }) {
      const { item: {id}, option: {id:optionId} } = payload;
      const itemIndex = state.items.findIndex(
        (itemObj) => itemObj.item.id === id && itemObj.option.id === optionId
      );

      console.log(current(state.items[itemIndex]));
      if (itemIndex !== -1) {
        state.items[itemIndex] = {
          ...state.items[itemIndex],
          option: {
            ...state.items[itemIndex].option,
            quantity: state.items[itemIndex].option.quantity + 1,
          },
        };
      }
    },

    removeOrder(state, action) {
      state.items = state.items.filter(
        (itemObj) => itemObj.item.id !== action.payload.id || itemObj.option.id !== action.payload.optionId
      );
    },

    removeSingleOrder(state, {payload}) {
      const { item: {id}, option: {id:optionId} } = payload;
      const itemIndex = state.items.findIndex(
        (itemObj) => itemObj.item.id === id && itemObj.option.id === optionId
      );

      if (itemIndex !== -1) {
        const currentItem = state.items[itemIndex].option
        if (currentItem.quantity > 1) {
          state.items[itemIndex] = {
            ...state.items[itemIndex],
            option: {
              ...state.items[itemIndex].option,
              quantity: state.items[itemIndex].option.quantity - 1,
            },
          };
        } else {
          state.items.splice(itemIndex, 1);
        }
      }
    },

    removeAllOrders(state) {
      state.items = [];
      state.totalPrice = 0;
    },

    orderTotalCost(state) {
      console.log(current(state.items))
      state.totalPrice = state.items.reduce((acc, itemObj) => {
        return acc + itemObj.option.quantity * (itemObj.item.price);
      }, 0);
    },
  },
});

export default cartSlice.reducer;

export const { addToCart,incrementQuantity, removeSingleOrder, removeOrder, removeAllOrders, orderTotalCost } = cartSlice.actions;
