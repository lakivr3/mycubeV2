"use client";
import { Cube } from "@prisma/client";
import { BiCube } from "react-icons/bi";
import "./Products.css";

import Link from "next/link";
import { LuShoppingCart } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/context";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
interface Props {
  cubes: Cube[];
}

const Products = ({ cubes }: Props) => {
  const { cart, setCart } = useGlobalContext();
  const router = useRouter();

  const [isSmallScreen, setIsSmallScreen] = useState(false); //550-2
  const [isMiddleScreen, setIsMiddleScreen] = useState(false); //768-3
  const [isLargeScreen, setIsLargeScreen] = useState(false); //1190-5

  const handleCart = (cube: Cube, id: number) => {
    const existingItem = cart.find((item) => item.id === id);
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
      const newItem = { ...cube, quantity: 1 };
      setCart([...cart, newItem]);
      toast.success("Added to cart!");
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth <= 1190);
      setIsMiddleScreen(window.innerWidth <= 768);
      setIsSmallScreen(window.innerWidth <= 550);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="products">
      <div className="products-h1">New products</div>
      <div className="products-p">
        Original Rubik's Cubes and various puzzles and brain teasers from
        Rubik's Workshop, popular competition cubes from brands such as MoYu,
        ShengShou, LanLan, QiYi, Yj and other top cube manufacturers.
      </div>
      <div className="products-product">
        {cubes.map((cube, index) => {
          if (isSmallScreen && index >= 2) {
            return null;
          } else if (isMiddleScreen && index >= 3) {
            return null;
          } else if (isLargeScreen && index >= 4) {
            return null;
          } else {
            return (
              <div key={cube.id + index} className="products-product-cube">
                <Link key={cube.id} href={`/cubes/${cube.id}`}>
                  <div className="container">
                    <img src={cube.img} alt="newcube" className="newcube" />
                    <div className="overlay scale-up-center">
                      <div className="content">
                        <BiCube className="bicube " />
                        <h1>More</h1>
                        <h1>Details</h1>
                      </div>
                    </div>
                  </div>
                  <div className="products-product-cube-about">
                    <h1 className="products-product-cube-about-title">
                      {cube.title}
                    </h1>
                    <h1 className="products-product-cube-about-price">
                      {cube.price.toString()},00 €
                    </h1>
                    <div className="products-product-cube-about-description">
                      <p>{cube.description}</p>
                    </div>
                  </div>
                </Link>

                <div
                  onClick={() => handleCart(cube, cube.id)}
                  className="products-product-cube-about-cart"
                >
                  <h1>Add to cart</h1>
                  <LuShoppingCart />
                </div>
              </div>
            );
          }
        })}
      </div>
      <Toaster />
      <button
        onClick={() => router.push("/cubes")}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg w-[200px]  rubiksimage-div-btn"
      >
        ALL PRODUCTS
      </button>{" "}
    </div>
  );
};

export default Products;
