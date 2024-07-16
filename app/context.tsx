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
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
}>({
  cart: initialCartValue,
  setCart: () => {},
  total: 0,
  setTotal: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

const AppContext = ({ children }: PropsWithChildren<{}>) => {
  const [cart, setCart] = useState<Cart[]>(initialCartValue);
  const [total, setTotal] = useState<number>(0);

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
    <GlobalContext.Provider value={{ cart, setCart, total, setTotal }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
