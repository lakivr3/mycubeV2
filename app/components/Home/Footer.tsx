import React from "react";
import {
  AiOutlineYoutube,
  AiOutlineFacebook,
  AiOutlineInstagram,
} from "react-icons/ai";
import { CiTwitter } from "react-icons/ci";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="theend">
      <h1 className="theend-h1">
        MyCube, Nis, Serbia 2023. All rights reserved. E-Mail:{" "}
        <span className="span">mycube@gmail.com</span>. Telephone:{" "}
        <span className="span">+381 555 333</span>
      </h1>
      <div className="theend-social">
        <AiOutlineFacebook className="facebook" />
        <AiOutlineInstagram className="instagram" />
        <CiTwitter className="twitter" />
        <AiOutlineYoutube className="youtube" />
      </div>
    </footer>
  );
};

export default Footer;
