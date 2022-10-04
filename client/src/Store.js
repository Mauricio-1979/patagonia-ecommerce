import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
    cart : {
        cartItem: localStorage.getItem('cartItem')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
    },
    userInfo: localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

function reducer(state, action){
    switch(action.type){
        case 'CART_ADD_ITEM':
            const newItem = action.payload;
            const existItem = state.cart.cartItem.find(
                (item) => item._id === newItem._id
            );
            const cartItem = existItem 
            ? state.cart.cartItem.map((item) => item._id === existItem._id ? newItem : item 
            ) : [...state.cart.cartItem, newItem]
            localStorage.setItem('cartItems', JSON.stringify(cartItem))
            return { ...state, cart: { ...state.cart, cartItem}};

            // return {
            //     ...state,
            //     cart: {
            //         ...state.cart,
            //         cartItem: [...state.cart.cartItem, action.payload]
            //     }
            // }
            case 'CART_REMOVE_ITEM': {
                const cartItem = state.cart.cartItem.filter(
                    (item) => item._id !== action.payload._id);
                    localStorage.setItem('cartItems', JSON.stringify(cartItem))
                return {
                    ...state,
                    cart: { ...state.cart, cartItem}
                }};
            case 'USER_SIGNIN': {
                return {
                    ...state, userInfo: action.payload
                };
            }    
            case 'USER_SIGNOUT': {
                return {
                    ...state,
                    userInfo: null,
                }
            }
        default:
             return state; 
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {state, dispatch};
    return <Store.Provider value={value} >{props.children}</Store.Provider>
}