import { Cube } from "@prisma/client";
import { BiCube } from "react-icons/bi";
import "./Products.css";

import Link from "next/link";
import { LuShoppingCart } from "react-icons/lu";
interface Props {
  cubes: Cube[];
}

const Products = ({ cubes }: Props) => {
  return (
    <div className="bestsellers">
      <div className="bestsellers-h1">New products</div>
      <div className="bestsellers-p">
        Original Rubik's Cubes and various puzzles and brain teasers from
        Rubik's Workshop, popular competition cubes from brands such as MoYu,
        ShengShou, LanLan, QiYi, Yj and other top cube manufacturers.
      </div>
      <div className="bestsellers-bestseller">
        {cubes.map((cube, index) => {
          return (
            <div key={cube.id + index} className="bestsellers-bestseller-cube">
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
                <div className="bestsellers-bestseller-cube-about">
                  <h1 className="bestsellers-bestseller-cube-about-title">
                    {cube.title}
                  </h1>
                  <h1 className="bestsellers-bestseller-cube-about-price">
                    {cube.price.toString()},00 €
                  </h1>
                  <div className="bestsellers-bestseller-cube-about-description">
                    <p>{cube.description}</p>
                  </div>
                </div>
              </Link>

              <div
                // onClick={() => handleCart(cube)}
                className="bestsellers-bestseller-cube-about-cart"
              >
                <h1>Add to cart</h1>
                <LuShoppingCart />
              </div>
            </div>
          );
        })}
      </div>
      {/* <ToastContainer /> */}
      <button
        // onClick={handleClicked}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg w-[200px]  rubiksimage-div-btn"
      >
        ALL PRODUCTS
      </button>{" "}
    </div>
  );
};

export default Products;
