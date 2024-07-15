"use client";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useEffect,
} from "react";

interface Cart {
  id: number;
  img: string;
  title: string;
  quantity: number;
  price: number;
}

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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = sessionStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      sessionStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isClient]);

  return (
    <GlobalContext.Provider value={{ cart, setCart }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
