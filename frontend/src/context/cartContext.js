import { createContext, useState, useContext } from "react"

export const CartContext = createContext(null)

export default function CartProvider({ children }) {
    const [cartAmount, setCartAmount] = useState(0)

    return (
        <CartContext.Provider value={{ cartAmount, setCartAmount }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    return useContext(CartContext)
}