import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";

export const store = configureStore({
  reducer: { cart: cartReducer },
});

// Cart change hote hi localStorage mein save (refresh pe cart nahi udega)
store.subscribe(() => {
  try {
    localStorage.setItem("cart", JSON.stringify(store.getState().cart.items));
  } catch {}
});

export default store;