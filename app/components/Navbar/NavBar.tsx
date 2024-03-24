"use client";
import React, { useState } from "react";
import { CgMenuGridR } from "react-icons/cg";
import { AiFillCloseCircle } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Image from "next/image";
import logo from "@/public/assets/logo.png";
import "./NavBar.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Avatar, Box, Dialog, DropdownMenu, Text } from "@radix-ui/themes";

// import { NavLink } from "react-router-dom";
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { status, data: session } = useSession();

  //   const { cart } = useGlobalContext();
  const handleToggleClick = () => {
    setToggleMenu(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="navbar  ">
      <div className="navbar-logo">
        <Link
          //   exact="true"
          //   activeclassname="active"
          className="navbar-my flex"
          href="/"
        >
          <Image className="navbar-my" src={logo} alt="" />
        </Link>
        <div className="flex mt-2">
          <div className="cart-smallscreen mr-4">
            <AuthStatus />
          </div>
          <div className="cart mb-2 mt-1">
            <Link className="cart-smallscreen" href="/cart">
              <AiOutlineShoppingCart
                size={25}
                style={{ marginBottom: "2rem", marginLeft: "1rem" }}
              />
              <span className="cart-h1">{/* {cart.length} */}0</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="navbar-links ">
        <ul>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/cubes">Cubes</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </li>
          <div className="cart-bigscreen ">
            <Link href="/cart">
              <div className="cart">
                <AiOutlineShoppingCart
                  size={25}
                  style={{ marginTop: "2px", marginLeft: "1rem" }}
                />
                <span className="cart-h1">{/* {cart.length} */}0</span>
              </div>
            </Link>
          </div>
          <AuthStatus />
        </ul>
      </div>

      <div className="navbar-links-smallscreen ">
        {!toggleMenu && (
          <CgMenuGridR
            className="navbar-links-smallscreen-menu"
            color="black"
            fontSize={27}
            onClick={() => setToggleMenu(true)}
          />
        )}

        {toggleMenu && (
          <div className="navbar-links-smallscreen-overlay  slide-bottom">
            <AiFillCloseCircle
              className="overlay-close"
              fontSize="1.5em"
              color="#white"
              onClick={() => setToggleMenu(false)}
            />
            <ul className="navbar-links-smallscreen ">
              <li onClick={() => handleToggleClick()}>
                <Link href="/about">About</Link>
              </li>
              <li onClick={() => handleToggleClick()}>
                <Link href="/cubes">Cubes</Link>
              </li>
              <li onClick={() => handleToggleClick()}>
                <Link href="/blog">Blog</Link>
              </li>
              <li onClick={() => handleToggleClick()}>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                {status === "unauthenticated" && (
                  <Link href="/api/auth/signin">Login</Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};
const AuthStatus = () => {
  const { status, data: session } = useSession();

  return (
    <Box ml="5" className="cursor-pointer">
      {status === "authenticated" && (
        <Dialog.Root>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar
                src={session.user?.image!}
                fallback="?"
                radius="full"
                size="2"
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
              <DropdownMenu.Label>
                <Text size="2">{session!.user?.email!}</Text>
              </DropdownMenu.Label>
              <DropdownMenu.Item>
                <Link href="/review">Write a review</Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <Link href="/api/auth/signout">Log out</Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Dialog.Root>
      )}
    </Box>
  );
};

export default Navbar;
