"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleMenu, closeMenu } from "@/store/slices/menuSlice";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { AiOutlineClose } from "react-icons/ai";
import { CgMenu } from "react-icons/cg";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { FaShoppingBag } from "react-icons/fa";
import CategoryFilter from "@/components/Category/CategoryFilter";
import Logo from "./Logo";

const MobileMenu = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.menu.isOpen);

  return (
    <div className="flex items-center justify-between gap-8 px-4 py-2">
      <div className="flex items-center">
        {/* Menu Toggle Button */}
        <button
          className="text-2xl cursor-pointer"
          onClick={() => dispatch(toggleMenu())}
        >
          {isOpen ? <AiOutlineClose /> : <CgMenu />}
        </button>
      </div>

      <div className="flex items-center">
        <Logo />
      </div>
      <div className="pr-4">
        <div className="flex items-center gap-1 text-sm relative">
          <Link className="font-semibold" href={`/wishlist`}>
            <FaShoppingBag className="text-lg" />
          </Link>
          <span className="absolute -top-2 -right-3">10</span>
        </div>
      </div>

      {/* Right Sidebar */}
      <Drawer
        open={isOpen}
        onClose={() => dispatch(closeMenu())}
        direction="left"
      >
        <DrawerContent className="!w-[300px]  p-4">
          {/* Title & Close Button */}

          <div className="flex justify-between items-center mb-2">
            <DrawerTitle className="text-lg font-semibold ">
              <SearchBar />
            </DrawerTitle>
          </div>

          {/* Description for screen readers (not shown visually unless styled) */}
          <DrawerDescription className="text-sm text-muted-foreground mb-4"></DrawerDescription>

          <div className="w-full">
            <h2 className="text-lg font-semibold px-4 pt-4">
              Filter by Category
            </h2>
            <CategoryFilter />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileMenu;
