"use client";
import "@/app/cubes/AllCubes.css";
import { Cube } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { BiCube } from "react-icons/bi";
import { LuShoppingCart } from "react-icons/lu";
import SectionWrapper from "../components/SectionWrapper";
import { useGlobalContext } from "../context";
import toast, { Toaster } from "react-hot-toast";

const AllCubes = () => {
  const { cart, setCart } = useGlobalContext();
  const {
    data: cubes,
    error,
    isLoading,
  } = useQuery<Cube[]>({
    queryKey: ["cubes"],
    queryFn: () => axios.get("/api/cube").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });
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
  if (isLoading) return <h1>Loading...</h1>;

  if (error) return null;

  return (
    <div className="products">
      <div className="products-h1">All of our cubes</div>

      <div className="products-product cubes ">
        {cubes?.map((cube: Cube, index: number) => (
          <div
            // variants={fadeIn("up", "spring", index * 0.2, 0.75)}
            key={cube.id}
            className="products-product-cube cubes-cube "
          >
            <Link href={`/cubes/${cube.id}`}>
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
                  {cube.price},00 €
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
        ))}
      </div>
      <Toaster />
    </div>
  );
};

export default SectionWrapper(AllCubes, "allcubes");
