import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts"))
    : [],
  statusSC: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    AgregarCarrito(state, action) {
      const { prodID, cantidad, tipoProd } = action.payload;
      const indexProdID = state.items.findIndex(
        item => item.prodID === prodID && item.tipoProd === tipoProd
      );
      if (indexProdID >= 0) {
        state.items[indexProdID].cantidad += cantidad;
      } else {
        state.items.push({ prodID, cantidad, tipoProd });
      }
      localStorage.setItem("carts", JSON.stringify(state.items));
    },
    cambiarCantidad(state, action) {
      const { prodID, cantidad, tipoProd } = action.payload;
      const index = state.items.findIndex(
        item => item.prodID === prodID && item.tipoProd === tipoProd
      );

      if (index >= 0) {
        if (cantidad > 0) {
          state.items[index].cantidad = cantidad;
        } else {
          state.items.splice(index, 1);
        }
        localStorage.setItem("carts", JSON.stringify(state.items));
      }
    },
    toggleStatusSC(state) {
      state.statusSC = !state.statusSC;
    },
    
    clearCart(state) {
      state.items = [];
      localStorage.removeItem("carts");
    }
  }
});

export const {
  AgregarCarrito,
  cambiarCantidad,
  toggleStatusSC,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
