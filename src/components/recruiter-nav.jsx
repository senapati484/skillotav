"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", href: "/recruiter/dashboard" },
  { label: "Profile", href: "/recruiter/profile" },
  { label: "Post Job", href: "/recruiter/post-job" },
  { label: "Search Candidates", href: "/recruiter/search" },
  { label: "Applicants", href: "/recruiter/applicants" },
]

export function RecruiterNav() {
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
