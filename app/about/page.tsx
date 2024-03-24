"use client";
import React from "react";
import "@/app/about/About.css";
import { motion } from "framer-motion";
import { slideIn } from "@/app/components/motions";
import SectionWrapper from "@/app/components/SectionWrapper";

const About = () => {
  return (
    <motion.div variants={slideIn("left", "tween", 0.2, 1)} className="about  ">
      <h1>About Us</h1>
      <div className="about-div1"></div>
      <p>
        Welcome to MyCube, your ultimate destination for all things Rubik's
        Cube! Founded with a passion for puzzles and a commitment to providing
        the finest in twisty challenges, MyCube is your one-stop shop for
        Rubik's Cube enthusiasts of all levels.
      </p>
      <h1>Our Story</h1>
      <div className="about-div1"></div>

      <p>
        Our journey began with a single twist and turn – a fascination with the
        iconic Rubik's Cube that ignited into a full-blown obsession. From
        solving the classic 3x3 cube to conquering complex variants and even
        tackling the enigmatic Megaminx, our team's love for puzzling knows no
        bounds. With a vision to share the joy of cubing, we set out on a
        mission to curate an exquisite collection of Rubik's Cubes, offering
        something for everyone – whether you're a newbie eager to learn or a
        seasoned solver seeking the next brain-teasing challenge.
      </p>
      <h1>Our Selection</h1>
      <div className="about-div2"></div>

      <p>
        At MyCube, we take pride in handpicking a diverse range of Rubik's Cubes
        that cater to all skill levels and interests. From the timeless original
        3x3 cube that started it all, to speedcubes designed to shave seconds
        off your solve time, and even shape-shifting puzzles that will leave
        your mind thoroughly twisted – our selection is curated to bring
        excitement and variety to your cubing journey.
      </p>
      <h1>Quality Assurance</h1>
      <div className="about-div3"></div>

      <p>
        We understand the importance of quality when it comes to your
        puzzle-solving experience. That's why each cube in our inventory
        undergoes rigorous testing to ensure smooth movements, durability, and
        an overall enjoyable solving experience. We're committed to delivering
        cubes that not only challenge your mind but also feel great in your
        hands.
      </p>
      <h1>Customer Satisfaction</h1>
      <div className="about-div4"></div>

      <p>
        Our customers are at the heart of everything we do. We're dedicated to
        providing exceptional service and ensuring your shopping experience is
        as smooth as the rotations of a well-lubricated cube. With secure
        payments, reliable shipping, and a responsive support team, your
        satisfaction is our top priority.
      </p>
      <h1>Join Us</h1>
      <div className="about-div5"></div>

      <p>
        Embrace the challenge, unlock your potential, and dive into the world of
        Rubik's Cubes with MyCube. Whether you're looking to expand your
        collection, enhance your solving skills, or simply revel in the joy of
        puzzling, we're here to accompany you on your twisty adventure.
        <span className="about-span">
          Thank you for choosing MyCube – where every twist counts!
        </span>
      </p>
    </motion.div>
  );
};

export default SectionWrapper(About, "about");
