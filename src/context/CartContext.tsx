"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Tipo para los productos en el carrito
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

// Inicializa contexto vacío
const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Estado del carrito, que se sincroniza con localStorage
  const [cart, setCart] = useState<CartItem[]>([]);

  // Efecto para cargar carrito desde localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Efecto para guardar el carrito en localStorage
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  // Función para agregar un producto al carrito
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      // Verifica si el producto ya está en el carrito
      const productIndex = prev.findIndex((product) => product.id === item.id);
      if (productIndex !== -1) {
        // Si ya existe, aumenta la cantidad
        const updatedCart = [...prev];
        updatedCart[productIndex].quantity += item.quantity;
        return updatedCart;
      }
      // Si no existe, lo agrega
      return [...prev, item];
    });
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Función para actualizar la cantidad de un producto
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
