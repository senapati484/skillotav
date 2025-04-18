"use client";

import React from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();
  return (
    <>
      {pathname === "/authentication" ? null : (
        <div className="w-full flex flex-col gap-7 items-around">
          <div className="flex justify-center text-4xl font-extrabold">
            SKILLOTAV
          </div>
          <div className="flex justify-center gap-5">
            <Button>Home</Button>
            <Button>About</Button>
            <Button>Contact</Button>
            <Link href="/authentication">
              <Button>Login</Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
