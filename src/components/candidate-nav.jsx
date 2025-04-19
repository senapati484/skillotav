"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", href: "/candidate/dashboard" },
  { label: "Profile", href: "/candidate/profile" },
  { label: "Credentials", href: "/candidate/credentials" },
  { label: "Tokens", href: "/candidate/tokens" },
  { label: "Opportunities", href: "/candidate/opportunities" },
  { label: "Applications", href: "/candidate/applications" },
]

export function CandidateNav() {
  const pathname = usePathname()

  return (
    <nav className="flex overflow-x-auto pb-2">
      <div className="flex space-x-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
