import React from "react";
import Container from "../Container";
import { FaFacebookF, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLogin, CiUser } from "react-icons/ci";

const Topbar = () => {
  return (
    <div className="bg-primary text-background">
      <Container>
        <div className="flex w-full justify-between items-center p-1.5">
          <div className="flex items-center gap-8 w-full justify-between md:justify-normal">
            {/* Call  */}
            <div className="flex items-center gap-2 text-sm">
              <FaPhoneAlt />
              <Link href={`tel:+8801767591988`}>+8801767-591988</Link>
            </div>
            {/* Social  */}
            <div className="flex items-center gap-2 text-sm">
              <p className="font-semibold">Folow Us</p>
              <FaFacebookF />
              <MdOutlineMailOutline />
              <FaWhatsapp />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm">
              <CiLogin />
              <Link className="font-semibold" href={`/login`}>
                Login
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Topbar;
