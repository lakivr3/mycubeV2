"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { slideIn } from "@/app/components/motions";
import SectionWrapper from "@/app/components/SectionWrapper";
import BigCubeCanvas from "../components/RubiksCube/BigCube";

const Contact = () => {
  const formRef = useRef<any>();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    //wCkTd-FZbl04ADTVE
    //template_60n1lmq
    //service_q748shd
    emailjs
      .send(
        "service_q748shd",
        "template_60n1lmq",
        {
          from_name: form.name,
          to_name: "Lazar",
          from_email: form.email,
          to_email: "lazar.zdravkovich@gmail.com",
          message: form.message,
        },
        "wCkTd-FZbl04ADTVE"
      )
      .then(
        () => {
          setLoading(false);
          alert("Sent!");
          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);

          console.log(error);
          alert("Something went wrong.");
        }
      );
  };
  return (
    <div>
      <h1 className="text-4xl font-bold  text-[rgb(255,0,0)] text-center  mt-[2rem]">
        Get in touch
      </h1>
      <div className="xl:mt-4 xl:flex-row flex-col flex gap-10 overflow-hidden ">
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] bg-black-100 m-12  p-8 rounded-2xl border border-black bg-gray-100"
        >
          <h1 className="font-bold text-3xl">Contact</h1>
          <form
            action=""
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12  flex flex-col gap-8"
          >
            <label htmlFor="" className="flex flex-col">
              <span className="text-black font-medium mb-4">Your Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your name?"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-black rounded-lg outlined-none border border-black font-medium"
              />
            </label>

            <label htmlFor="" className="flex flex-col">
              <span className="text-black font-medium mb-4">Your Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your email?"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-black rounded-lg outlined-none border border-black font-medium"
              />
            </label>

            <label htmlFor="" className="flex flex-col">
              <span className="text-black font-medium mb-4">Your Message</span>
              <textarea
                rows={7}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What do you want to say?"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-black rounded-lg outlined-none border border-black font-medium"
              />
            </label>
            <button
              type="submit"
              className=" border border-black bg-tertiary py-3 px-8 outline-none w-fit text-black font-bold shadow-md shadow-primary rounded-xl text-center"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </motion.div>
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] xl:mt-16"
        >
          <BigCubeCanvas />
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
