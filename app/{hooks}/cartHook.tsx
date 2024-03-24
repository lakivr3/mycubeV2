import { Cube } from "@prisma/client";
import { useState } from "react";
interface Cart {
  id: number;
  img: string;
  title: string;
  quantity: number;
  price: number;
}

const cartHook = () => {
  const [cart, setCart] = useState<Cart[]>([]);
  console.log(cart);
  return { cart, setCart };
};

export default cartHook;
