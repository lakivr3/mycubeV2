"use client";
import { GrFormAdd } from "react-icons/gr";
import { AiOutlineMinus } from "react-icons/ai";
import cartHook from "../{hooks}/cartHook";
import { useEffect, useState } from "react";
import { Cube } from "@prisma/client";
import { useGlobalContext } from "../context";

const Cart = () => {
  const { cart, setCart } = useGlobalContext();
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(0);
  const [item, setItem] = useState();

  const handlePlus = (id: number) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        item.quantity += 1;
      }
      return item;
    });

    setCart(updatedCart);
  };
  const handleMinus = (id: number) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        item.quantity -= 1;
      }
      return item;
    });

    setCart(updatedCart);
  };

  const handleDelete = (id: number) => {
    const newCart = cart.filter((c) => c.id !== id);
    setCart(newCart);
  };
  useEffect(() => {
    const price = cart.reduce((partialSum, item) => {
      return partialSum + item.price;
    }, 0);

    const totalPrice = cart.reduce((partialSum, item) => {
      return partialSum + item.price * item.quantity;
    }, 0);

    setTotal(totalPrice);
    setPrice(price);
  }, [cart]);
  if (cart.length <= 0) {
    return (
      <div className="h-[100vh]">
        <h1 className=" mt-6 text-center font-bold text-2xl">Cart is empty</h1>
      </div>
    );
  } else {
    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-[100vh]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-200 dark:text-gray-600">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>

              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Total Price
              </th>
              <th scope="col" className="px-6 py-3">
                Delete Artical
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.map((c, index) => {
              return (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-100 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-black whitespace-nowrap flex  gap-3 "
                  >
                    <img width="50px" src={c.img} alt="" />
                    <h1 className="mr-5">{c.title}</h1>
                  </th>

                  <td className="px-6 py-4 text-black ">
                    <div className="flex">
                      {c.quantity <= 1 ? (
                        <button
                          disabled
                          onClick={() => handleMinus(c.id)}
                          className="cursor-pointer bg-gray-300 mr-4 p-1 border border-black"
                        >
                          <AiOutlineMinus
                            className=""
                            color="black"
                            size={12}
                          />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleMinus(c.id)}
                          className="cursor-pointer bg-gray-300 mr-4 p-1 border border-black"
                        >
                          <AiOutlineMinus
                            className=""
                            color="black"
                            size={12}
                          />
                        </button>
                      )}
                      {c?.quantity}
                      <button
                        onClick={() => handlePlus(c.id)}
                        className="cursor-pointer bg-gray-300 ml-4 p-1 border border-black"
                      >
                        <GrFormAdd className="" color="black" size={12} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-black">{c.price},00 Euro</td>
                  <td className="px-6 py-4 text-black">
                    {c.price * c.quantity},00 Euro
                  </td>
                  <td className="px-6 py-4 text-black">
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg w-[100px] "
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="font-semibold text-gray-900 dark:text-black">
              <th scope="row" className="px-6 py-3 text-base">
                Total
              </th>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3">{price},00 Euro</td>
              <td className="px-6 py-3 text-red-500 text-xl">
                {total},00 Euro
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
};

export default Cart;
