import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    additem: (state) => {
      state.value += 1;
    },
    removeitem: (state) => {
      state.value -= 1;
    }
    
  }
});
 export const {additem, removeitem}=cartSlice.actions;
 export default cartSlice.reducer;