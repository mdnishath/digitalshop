import Image from "next/image";
import React from "react";
import SearchBar from "./SearchBar";
import { FaRegHeart, FaShoppingBag } from "react-icons/fa";
import Link from "next/link";
import { CiLogin, CiUser } from "react-icons/ci";
import Container from "../Container";
import Topbar from "./Topbar";
import Logo from "./Logo";

const DesktopMenu = () => {
  return (
    <div className="bg-background shadow-2xl">
      <Container>
        <div className="">
          <div className="flex items-center gap-8 py-2 justify-between">
            <Logo />
            <div className="w-[400px]">
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
        </div>
      </Container>
    </div>
  );
};

export default DesktopMenu;
