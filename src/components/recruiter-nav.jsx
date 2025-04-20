"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/provider/AuthProvider";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Dashboard", href: "/recruiter/dashboard" },
  { label: "Profile", href: "/recruiter/profile" },
  { label: "Post Job", href: "/recruiter/post-job" },
  { label: "Search Candidates", href: "/recruiter/search" },
  { label: "Applicants", href: "/recruiter/applicants" },
];

export function RecruiterNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <>
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href="/recruiter/dashboard"
            className="text-2xl font-clash font-bold"
          >
            SkillChain
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user?.photoURL || "/placeholder.svg"}
                    alt="Profile"
                  />
                  <AvatarFallback>AC</AvatarFallback>
                  {/* <AvatarFallback className="text-xl font-clash">
                    {`${profile.firstName?.[0] || ""}${
                      profile.lastName?.[0] || ""
                    }`}
                  </AvatarFallback> */}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/recruiter/profile" className="w-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/recruiter/settings" className="w-full">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/auth/login" className="w-full">
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="container mx-auto px-4 py-4">
        <nav className="flex overflow-x-auto pb-2">
          <div className="flex flex-row gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "py-2 text-md font-bold rounded-md whitespace-nowrap relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-left",
                  pathname === item.href
                    ? "text-foreground after:bg-foreground"
                    : "text-muted-foreground hover:text-foreground after:bg-muted-foreground after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
