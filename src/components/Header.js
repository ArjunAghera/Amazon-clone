import React from "react";
import Image from "next/image";
import logo from "../../public/amazon_PNG11.png";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/client";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

function Header() {
  const [session, loading] = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);
  return (
    <>
      <div className=" flex items-center bg-amazon_blue p-1 flex-grow py-2 ">
        {/* Left-logo */}
        <div className=" mt-2 flex-grow sm:flex-grow-0 ">
          <Image
            onClick={() => router.push("/")}
            src={logo}
            width={150}
            height={40}
            objectFit="contain"
            className=" cursor-pointer "
          />
        </div>

        {/* search */}
        <div className=" hidden h-8 sm:flex items-center rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500  ">
          <input
            className=" p-4 h-full rounded-l-md w-10 flex-grow focus:outline-none "
            type="text"
          />
          <SearchIcon className=" h-12 p-4 " />
        </div>

        {/* right */}
        <div className=" text-white items-center space-x-6 text-xs flex mx-6 whitespace-nowrap ">
          <div onClick={!session ? signIn : signOut} className=" link ">
            <p>{session ? `Hello, ${session.user.name}` : `Please Sign-In`}</p>
            <p className="md:text-sm font-bold">Account info</p>
          </div>
          <div className="link" onClick={() => router.push("/orders")}>
            <p>Returns</p>
            <p className="md:text-sm font-bold">& Orders</p>
          </div>
          <div
            onClick={() => router.push("/checkout")}
            className="relative flex items-center link"
          >
            <ShoppingCartIcon className=" h-8 " />
            <span className=" bg-yellow-400 rounded-full absolute top-0 right-0 md:right-10 h-4 w-4 text-black text-center font-bold">
              {items.length}
            </span>
            <p className=" mt-2 hidden md:inline md:text-sm font-bold">
              Basket
            </p>
          </div>
        </div>
      </div>

      {/* mobile search */}
      <div className="sm:hidden bg-amazon_blue p-4 ">
        <div className=" flex sm:hidden h-8 items-center rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500 mx-10 ">
          <input
            className=" p-4 h-full rounded-l-md w-10 flex-grow focus:outline-none "
            type="text"
          />
          <SearchIcon className=" h-12 p-4 " />
        </div>
      </div>

      {/* extra nav eles */}
      <div className=" flex bg-amazon_blue-light text-white p-2 text-xs space-x-6 items-center">
        <MenuIcon className=" h-4" />
        <p className="link">All</p>
        <p className="link">Amazon Prime</p>
        <p className="link">Amazon Business</p>
        <p className="link hidden md:inline ">Electronics</p>
        <p className="link hidden md:inline">Clothing</p>
        <p className="link hidden md:inline">Grocery</p>
        <p className="link hidden md:inline">Home Appliance</p>
      </div>
    </>
  );
}

export default Header;
