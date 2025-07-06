import Image from "next/image";
import React from "react";
import SearchBar from "./SearchBar";
import { FaRegHeart, FaShoppingBag } from "react-icons/fa";
import Link from "next/link";
import { CiLogin, CiUser } from "react-icons/ci";

const DesktopMenu = () => {
  return (
    <div className="flex items-center gap-8 py-2 justify-between">
      <div>
        {/* <Image src={"/logo.webp"} width={180} height={60} alt="logo" /> */}
        <p className="font-bold text-2xl">DIGITAL TOOLS</p>
      </div>
      <div>
        <SearchBar />
      </div>
      <div className="flex gap-4">
        <div className="flex gap-2 ">
          <div className="flex items-center gap-1 text-sm">
            <Link className="font-semibold" href={`/wishlist`}>
              <FaRegHeart className="text-lg" />
            </Link>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Link className="font-semibold" href={`/wishlist`}>
              <FaShoppingBag className="text-lg" />
            </Link>
          </div>
        </div>
        <div className="flex gap-1">
          <div className="flex items-center gap-1 text-sm">
            <Link className="font-semibold text-lg" href={`/login`}>
              Login
            </Link>
          </div>
          /
          <div className="flex items-center gap-1 text-sm">
            <Link className="font-semibold text-lg" href={`/register`}>
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopMenu;
