"use client";
import { useRouter } from "next/navigation";
import React from "react";
import "./RubiksImage.css";

const RubiksImage = () => {
  const route = useRouter();
  return (
    <div className="rubiksimage">
      <div className="rubiksimage-content">
        <h1 className="rubiksimage-h1-first">THE FIRST ONLINE STORE OF </h1>
        <h1 className="rubiksimage-h1-second"> SPEED CUBES IN EUROPE</h1>
        <div className="rubiksimage-content-button">
          <button
            onClick={() => {
              route.push("/cubes");
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg  rubiksimage-div-btn"
          >
            Check out our cubes
          </button>
        </div>
      </div>
    </div>
  );
};

export default RubiksImage;
