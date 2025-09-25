"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Context provider that manages the shopping cart state and its persistence

// Type for products in the cart
interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

// Initialize an empty context
const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Cart state synchronized with localStorage
  const [cart, setCart] = useState<CartItem[]>([]);

  // Effect to load the cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Effect to save the cart into localStorage
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  // Function to add a product to the cart
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      // Check if the product is already in the cart
      const productIndex = prev.findIndex((product) => product.id === item.id);
      if (productIndex !== -1) {
        // If it exists, increase the quantity
        const updatedCart = [...prev];
        updatedCart[productIndex].quantity += item.quantity;
        return updatedCart;
      }
      // If it does not exist, add it
      return [...prev, item];
    });
  };

  // Function to remove a product from the cart
  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Function to update the quantity of a product
  const updateQuantity = (id: number, quantity: number) => {
    setCart((prev) => {
      const updatedCart = [...prev];
      const productIndex = updatedCart.findIndex((item) => item.id === id);
      if (productIndex !== -1 && quantity > 0) {
        updatedCart[productIndex].quantity = quantity;
      }
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

