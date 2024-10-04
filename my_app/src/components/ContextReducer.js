import React, { createContext, useContext, useReducer } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

export const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            // If item exists, increase the quantity
            const existingItem = state.find((item) => item.id === action.id && item.size === action.size);
            if (existingItem) {
                return state.map((item) =>
                    item.id === action.id && item.size === action.size
                        ? { ...item, qty: item.qty + Number(action.qty) } // Ensure qty is treated as a number
                        : item
                );
            }
            // If item does not exist, add it to the cart
            return [...state, { id: action.id, name: action.name, qty: Number(action.qty), size: action.size, price: action.price, img: action.img }];

        case "REMOVE":
            // Remove item based on both ID and size
            return state.filter((item) => !(item.id === action.id && item.size === action.size));

        case "UPDATE_QTY":
            // Update the quantity of the item
            // Update the quantity of the item
            return state.map((item) =>
                item.id === action.id && item.size === action.size
                    ? { ...item, qty: parseInt(action.qty) }
                    : item
            );

        default:
            console.log("Error in Reducer");
            return state;
    }
};

export const CartProvider = ({ children }) => {
    //localStorage -> Cart will stay if not checked out
    //sessionStorage -> Cart will not stay after closing the tab/browser

    // Load cart from local storage if it exists
    const [state, dispatch] = useReducer(reducer, JSON.parse(sessionStorage.getItem('cart')) || []);

    // Effect to save cart to local storage whenever it changes
    React.useEffect(() => {
        sessionStorage.setItem('cart', JSON.stringify(state));
    }, [state]);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatch = () => useContext(CartDispatchContext);
