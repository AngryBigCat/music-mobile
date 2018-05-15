import { createStore } from 'redux';


const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'BALANCE_CART':
            const cartItems = action.cartItems.filter(item => item.checked);
            return {
                ...state,
                cartItems: cartItems,
                total_price: action.total_price
            };
        default:
            return state;
    }
};

const store = createStore(reducer);

export default store;