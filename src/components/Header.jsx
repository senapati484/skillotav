"use client";

import React from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";

import { LuSun, LuMoon } from "react-icons/lu";

const components = [
  {
    title: "Alert Dialog",
    href: "https://ui.shadcn.com/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "https://ui.shadcn.com/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "https://ui.shadcn.com/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "https://ui.shadcn.com/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "https://ui.shadcn.com/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "https://ui.shadcn.com/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

const Header = () => {
  const pathname = usePathname();
  const [isDark, setIsDark] = React.useState(false);

  // On mount, check localStorage and html class
  React.useEffect(() => {
    const storedTheme =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const html =
      typeof window !== "undefined" ? window.document.documentElement : null;
    if (storedTheme === "dark") {
      setIsDark(true);
      html?.classList.add("dark");
    } else if (storedTheme === "light") {
      setIsDark(false);
      html?.classList.remove("dark");
    } else {
      // Default: match system
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
      if (prefersDark) {
        html?.classList.add("dark");
      } else {
        html?.classList.remove("dark");
      }
    }
  }, []);

  // Toggle theme handler
  const toggleTheme = () => {
    const html = window.document.documentElement;
    if (isDark) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <>
      {pathname === "/authentication" ? null : (
        <div className="w-full flex justify-around items-center border-b-1 py-2 sticky top-0 z-50 bg-background">
          <div className="flex gap-3">
            <div className="flex justify-center items-center text-4xl font-extrabold dark:invert">
              SKILLOTAV
            </div>
            <div className="flex justify-center gap-5">
              <NavigationMenu className="z-5 ">
                <NavigationMenuList>
                  <NavigationMenuItem className="sm:block hidden">
                    <NavigationMenuTrigger>
                      Getting started
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[500px] gap-3 p-2 lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <div
                            className="flex h-full w-full select-none flex-col justify-end rounded-base p-6 no-underline outline-hidden"
                            style={{
                              backgroundImage:
                                "linear-gradient(to bottom right, var(--main), 40%, var(--primary))",
                            }}
                          >
                            <div className="mb-2 mt-4 text-lg font-heading">
                              shadcn/ui
                            </div>
                            <p className="text-sm font-base leading-tight">
                              Beautifully designed components that you can copy
                              and paste into your apps. Accessible.
                              Customizable. Open Source.
                            </p>
                          </div>
                        </li>
                        <ListItem
                          href="https://ui.shadcn.com/docs"
                          title="Introduction"
                        >
                          Re-usable components built using Radix UI and Tailwind
                          CSS.
                        </ListItem>
                        <ListItem
                          href="https://ui.shadcn.com/docs/installation"
                          title="Installation"
                        >
                          How to install dependencies and structure your app.
                        </ListItem>
                        <ListItem
                          href="https://ui.shadcn.com/docs/primitives/typography"
                          title="Typography"
                        >
                          Styles for headings, paragraphs, lists...etc
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {components.map((component) => (
                          <ListItem
                            key={component.title}
                            title={component.title}
                            href={component.href}
                          >
                            {component.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="https://ui.shadcn.com/docs">
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Documentation
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-3">
            {/* dark mode/light mode */}
            <Button
              onClick={toggleTheme}
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDark ? <LuMoon /> : <LuSun />}
            </Button>
            {/* login signup */}
            <Link href="/authentication">
              <Button>Login / Signup</Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

function ListItem({ className, title, children, href, ...props }) {
  return (
    <li>
      <Link href={href} passHref legacyBehavior>
        <NavigationMenuLink
          className={cn(
            "hover:bg-accent block text-main-foreground select-none space-y-1 rounded-base border-2 border-transparent p-3 leading-none no-underline outline-hidden transition-colors hover:border-border",
            className
          )}
          {...props}
        >
          <div className="text-base font-bold leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug">{children}</p>
        </NavigationMenuLink>
      </Link>
    </li>
  );
}

export default Header;
