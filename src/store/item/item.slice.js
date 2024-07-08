import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "item",
  initialState: {
    item: {},
    totalPrice: 0,
  },
  reducers: {
    addToItem(state, {payload}) {
      const data = {
        ...payload,
        uploadedImages: []
      }

      state.item = data;
      // const itemExists = state.items.some(
      //   (itemObj) => itemObj.item.id === action.payload.id
      // );
      // if (!itemExists) {
      //   state.items.push({ item: action.payload, quantity: 1 });
      // } else {
      //   state.items = state.items.map((itemObj) =>
      //     itemObj.item.id === action.payload.id
      //       ? { ...itemObj, quantity: itemObj.quantity + 1 }
      //       : itemObj
      //   );
      // }
    },

    uploadeImages(state, {payload}) {
      state.item = {...state.item, uploadedImages:[...state.item.uploadedImages, payload]}
    },

    uploadImage(state, { payload }) {
      state.item = { ...state.item, imageUrl: payload }
    },

    deleteImages(state, {payload}) {
      state.item.uploadedImages =  state.item.uploadedImages.filter((_, i) => i !== payload)
    },

    removeItem(state, action) {
          state.item = {}
    },

    removeSingleOrder(state, action) {
    
      const itemIdToRemove = action.payload;
      const itemIndex = state.items.findIndex(
        (itemObj) => itemObj.item.id === itemIdToRemove
      );

      if (itemIndex !== -1) {
        const currentItem = state.items[itemIndex];

        if (currentItem.quantity > 1) {
          state.items[itemIndex] = {
            ...currentItem,
            quantity: currentItem.quantity - 1,
          };
        } else {
          state.items.splice(itemIndex, 1);
        }
      }
    },
    removeAllOrders(state, action) {
      state.items = [], 
      state.totalPrice = 0
    },
    orderTotalCost(state, action) {
      state.totalPrice = state.items.reduce((acc, itemObj) => {
        return acc + itemObj.quantity * itemObj.item.price;
      }, 0);
    },
  },
});

export default itemSlice.reducer;

export const { addToItem,uploadeImages, deleteImages,uploadImage,  removeItem, removeOrder,removeAllOrders,orderTotalCost } = itemSlice.actions;
