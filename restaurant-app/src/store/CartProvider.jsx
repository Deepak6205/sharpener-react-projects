import { useReducer } from "react";
import CartContext from "./Cart-Context";

const defaulCartState = {
    items:[],
    totalAmount:0
}
const cartReducer = (state,action)=>{
    if(action.type === 'ADD'){
        const updatedItems=state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amont;
        return{
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }
    }
    return defaulCartState;
}
const CartProvider = (props) => {
     const [cartState,dispatchCArtAction]=useReducer(cartReducer,defaulCartState)
    const addItemToCartHandler = (item) =>{
        dispatchCArtAction({type:"ADD",item:item})
    }
    const removeItemFromCartHandler = (id) =>{
        dispatchCArtAction({type:"REMOVE",id:id})
    }
    const cartContext = {
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    }
  return <CartContext.Provider value={cartContext}>
    {props.children}
    </CartContext.Provider>;
};

export default CartProvider;
