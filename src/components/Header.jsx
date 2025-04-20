"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useAuth } from "@/components/provider/AuthProvider";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();

  return (
    <div className="w-full flex justify-around items-center border-b-1 py-2 sticky top-0 bg-background/80 backdrop-blur-sm z-[100]">
      <div className="flex gap-3">
        <div className="flex justify-center items-center text-4xl font-extrabold dark:invert">
          <Link href="/">SKILLOTAV</Link>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                theme === "dark"
                  ? "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  : "M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              }
            />
          </svg>
        </Button>

        {user ? (
          <>
            <Button
              className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
              asChild
            >
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button
              className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
              onClick={signOut}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button
              className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
              asChild
            >
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button
              className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
              asChild
            >
              <Link href="/auth/register">Register</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;