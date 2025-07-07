import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"}>
      {/* <Image src={"/logo.webp"} width={180} height={60} alt="logo" /> */}
      <p className="font-bold text-2xl">DIGITAL TOOLS</p>
    </Link>
  );
};

export default Logo;
