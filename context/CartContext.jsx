"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [mounted, setMounted] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [items, setItems] = useState([]);
  const [customer, setCustomer] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: ""
  });

  // Charger les données depuis localStorage après le mount
  useEffect(() => {
    setMounted(true);
    const savedItems = localStorage.getItem("paridor-cart");
    const savedCustomer = localStorage.getItem("paridor-customer");
    
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (error) {
        console.error("Erreur lors du chargement du panier:", error);
      }
    }
    
    if (savedCustomer) {
      try {
        setCustomer(JSON.parse(savedCustomer));
      } catch (error) {
        console.error("Erreur lors du chargement des données client:", error);
      }
    }
    
    setHydrated(true);
  }, []);

  // Sauvegarder le panier dans localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("paridor-cart", JSON.stringify(items));
    }
  }, [items, mounted]);

  // Sauvegarder les données client dans localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("paridor-customer", JSON.stringify(customer));
    }
  }, [customer, mounted]);

  const addItem = (product) => {
    setItems(prevItems => {
      // Créer une clé unique basée sur l'ID + options
      const createItemKey = (item) => {
        const optionsStr = item.options ? JSON.stringify(item.options) : '';
        return `${item.id}_${optionsStr}`;
      };
      
      const newItemKey = createItemKey(product);
      const existingItem = prevItems.find(item => createItemKey(item) === newItemKey);
      
      if (existingItem) {
        return prevItems.map(item =>
          createItemKey(item) === newItemKey
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const updateQty = (itemKey, quantity) => {
    if (quantity <= 0) {
      removeItem(itemKey);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item => {
        const optionsStr = item.options ? JSON.stringify(item.options) : '';
        const currentItemKey = `${item.id}_${optionsStr}`;
        return currentItemKey === itemKey ? { ...item, quantity } : item;
      })
    );
  };

  const removeItem = (itemKey) => {
    setItems(prevItems => prevItems.filter(item => {
      const optionsStr = item.options ? JSON.stringify(item.options) : '';
      const currentItemKey = `${item.id}_${optionsStr}`;
      return currentItemKey !== itemKey;
    }));
  };

  const clear = () => {
    setItems([]);
    localStorage.removeItem("paridor-cart");
  };

  // Alias pour plus de clarté
  const clearCart = clear;

  const updateCustomer = (field, value) => {
    setCustomer(prev => ({ ...prev, [field]: value }));
  };

  // Calculs avec useMemo pour éviter les re-renders inutiles
  const totalItems = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [items]);

  const value = {
    mounted,
    hydrated,
    items,
    customer,
    totalItems,
    subtotal,
    addItem,
    updateQty,
    removeItem,
    clear,
    clearCart, // Alias explicite
    updateCustomer
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}