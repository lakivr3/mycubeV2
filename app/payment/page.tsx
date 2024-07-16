"use client";
import React from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import CheckoutPage from "../components/CheckoutPage";
import { useGlobalContext } from "../context";
import { useSession } from "next-auth/react";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined)
  throw new Error("process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const PaymentPage = () => {
  const { total } = useGlobalContext();
  const { status, data: session } = useSession();

  return (
    <div className="h-[100vh]">
      <main className="  max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr bg-[#7575757a]">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2">
            {session ? session.user?.name : "Guest"}
          </h1>
          <h2 className="text-2xl">
            has requested
            <span className="font-bold"> €{total}</span>
          </h2>
        </div>

        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(total),
            currency: "eur",
          }}
        >
          <CheckoutPage amount={total} />
        </Elements>
      </main>
    </div>
  );
};

export default PaymentPage;
