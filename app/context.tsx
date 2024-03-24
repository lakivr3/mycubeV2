"use client";
import { createContext, PropsWithChildren, useContext, useState } from "react";

interface Cart {
  id: number;
  img: string;
  title: string;
  quantity: number;
  price: number;
}

// Providing an initial value for the context
const initialCartValue: Cart[] = [];

const GlobalContext = createContext<{
  cart: Cart[];
  setCart: React.Dispatch<React.SetStateAction<Cart[]>>;
}>({
  cart: initialCartValue,
  setCart: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

const AppContext = ({ children }: PropsWithChildren<{}>) => {
  const [cart, setCart] = useState<Cart[]>(initialCartValue);

  return (
    <GlobalContext.Provider value={{ cart, setCart }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
