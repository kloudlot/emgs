"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@chakra-ui/react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  currency: string;
  image?: any;
  serviceSlug?: string;
  serviceName?: string;
  packageType: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const toast = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items, isInitialized]);

  const addToCart = (item: CartItem) => {
    // Check if item already exists in cart
    const existingItem = items.find((i) => i.id === item.id);
    
    if (existingItem) {
      toast({
        title: "Already in cart",
        description: `${item.name} is already in your cart`,
        status: "info",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setItems([...items, item]);
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const removeFromCart = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
    toast({
      title: "Removed from cart",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart");
  };

  const totalItems = items.length;
  
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
