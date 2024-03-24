"use client";
import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineMinus } from "react-icons/ai";
import { GrFormAdd } from "react-icons/gr";
import { Cube } from "@prisma/client";
import cartHook from "@/app/{hooks}/cartHook";
import { notFound } from "next/navigation";
import "./CubeDetails.scss";
import { useGlobalContext } from "@/app/context";
interface Cart {
  id: number;
  img: string;
  title: string;
  quantity: number;
  price: number;
}

const CubeDetails = ({ cube }: { cube: Cube }) => {
  const [quantity, setQuantity] = useState(1);
  const [isdisabled, setDisabled] = useState(true);
  const { cart, setCart } = useGlobalContext();
  useEffect(() => {
    if (quantity <= 1) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [quantity]);

  const handlePlus = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleCart = () => {
    const existingItem = cart.find((item) => item.title === cube.title);
    if (existingItem) {
      toast("Already added to cart!", {
        duration: 3000,
        position: "top-center",
        style: {
          padding: "10px",
          color: "black",
          background: "white",
        },
        icon: "ℹ️",
      });
    } else {
      const newItem = { ...cube, quantity };
      setCart([...cart, newItem]);
      toast.success("Added to cart!");
    }
  };

  if (!cube) notFound();
  console.log(cart);

  return (
    <div className="min-h-[100vh]">
      <div className="selectedcube">
        <img src={cube.img} alt={cube.img} />
        <div className="selectedcube-details">
          <h1 className="selectedcube-details-title">{cube.title}</h1>
          <h1 className="selectedcube-details-price">{cube.price},00 €</h1>
          <h1 className="selectedcube-details-code">
            Article code:{" "}
            <span className="selectedcube-details-code-span">{cube.id}</span>
          </h1>
          <h1 className="selectedcube-details-description">
            {cube.description}
          </h1>
          <div className="selectedcube-details-quantity">
            <div className="selectedcube-details-quantity-state">
              <h1 className="selectedcube-details-quantity-state-h1">
                Quantity:
              </h1>
              <button
                disabled={isdisabled}
                onClick={handleMinus}
                className="selectedcube-details-quantity-state-button bg-gray-200"
              >
                <AiOutlineMinus className="minus" />
              </button>
              <div className="selectedcube-details-quantity-state-value">
                <h1>{quantity}</h1>
              </div>
              <button
                onClick={handlePlus}
                className="selectedcube-details-quantity-state-button bg-gray-200"
              >
                <GrFormAdd className="plus" />
              </button>
            </div>
            <div className="selectedcube-details-quantity-delivery bg-gray-100">
              <h1>Time of delivery</h1>
              <h1 className="selectedcube-details-quantity-delivery-h1">
                24-48 hours
              </h1>
            </div>
          </div>
          <button
            onClick={handleCart}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg w-[200px]  rubiksimage-div-btn"
          >
            Add to cart
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default CubeDetails;
