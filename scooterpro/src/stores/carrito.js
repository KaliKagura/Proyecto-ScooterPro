import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    items: localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts")) : [],
    statusSC: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        AgregarCarrito(state, action){
            const {prodID, cantidad} = action.payload;
            const indexProdID = (state.items).findIndex(item => item.prodID === prodID);
            if(indexProdID >= 0){
                state.items[indexProdID].cantidad += cantidad;
            } else{
                state.items.push({prodID, cantidad});   
            }
            localStorage.setItem("carts", JSON.stringify(state.items));
        },
        cambiarCantidad(state,action){
            const {prodID, cantidad} = action.payload;
            const indexProdID = (state.items).findIndex(item => item.prodID === prodID);
            if (cantidad > 0){
                state.items[indexProdID].cantidad = cantidad;
            }else{
                //delete state.items[indexProdID];
                state.items = (state.items).filter(item => item.prodID !== prodID);
            }
            localStorage.setItem("carts", JSON.stringify(state.items));
        },
        toggleStatusSC(state){
            if(state.statusSC === false){
                state.statusSC = true;
            }else{
                state.statusSC = false;
            }
        }
    }
})

export const { AgregarCarrito, cambiarCantidad, toggleStatusSC } = cartSlice.actions;
export default cartSlice.reducer;