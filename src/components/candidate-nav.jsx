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
  { label: "Dashboard", href: "/candidate/dashboard" },
  { label: "Profile", href: "/candidate/profile" },
  { label: "Credentials", href: "/candidate/credentials" },
  { label: "Opportunities", href: "/candidate/opportunities" },
  { label: "Applications", href: "/candidate/applications" },
];

export function CandidateNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  // Sample profile data - keeping other data static for now
  const profile = {
    firstName: user?.displayName?.split(" ")[0] || "",
    lastName: user?.displayName?.split(" ")[1] || "",
    email: user?.email || "",
    phone: "+91 8653420095", // This will remain static for now
    location: "Amta Howrah West Bengal", // This will remain static for now
    bio: "Frontend developer with 3 years of experience specializing in React and Next.js. Passionate about creating intuitive user interfaces and accessible web applications.",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    portfolio: "https://johndoe.dev",
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University of Technology",
        year: "2018 - 2022",
        verified: true,
      },
    ],
    experience: [
      {
        position: "Frontend Developer",
        company: "TechStart Inc.",
        duration: "2022 - Present",
        description:
          "Developing and maintaining web applications using React and Next.js.",
        verified: true,
      },
      {
        position: "Web Development Intern",
        company: "Digital Solutions",
        duration: "2021 - 2022",
        description:
          "Assisted in the development of client websites and internal tools.",
        verified: false,
      },
    ],
    skills: [
      { name: "React", level: "Advanced", verified: true },
      { name: "Next.js", level: "Intermediate", verified: true },
      { name: "TypeScript", level: "Intermediate", verified: true },
      { name: "CSS/SCSS", level: "Advanced", verified: false },
      { name: "Node.js", level: "Beginner", verified: false },
    ],
    extracurricular: [
      {
        title: "Student Council President",
        organization: "University of Technology",
        duration: "2021 - 2022",
        description: "Led student initiatives and organized campus-wide events",
        verified: true,
        tokenValue: 3,
      },
      {
        title: "Volunteer Teaching Assistant",
        organization: "Code for Kids",
        duration: "2020 - 2021",
        description:
          "Taught basic programming concepts to underprivileged children",
        verified: true,
        tokenValue: 2,
      },
      {
        title: "Tech Community Lead",
        organization: "Local Developer Meetup",
        duration: "2022 - Present",
        description: "Organizing monthly tech talks and workshops",
        verified: false,
        tokenValue: 2,
      },
    ],
  };

  return (
    <div className="">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href="/candidate/dashboard"
            className="text-2xl font-clash font-bold"
          >
            SkillChain
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8 border-border">
                  <AvatarImage
                    src={user?.photoURL || "/placeholder.svg"}
                    alt="Profile"
                  />
                  <AvatarFallback className="text-xl font-clash">
                    {`${profile.firstName?.[0] || ""}${
                      profile.lastName?.[0] || ""
                    }`}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/candidate/profile" className="w-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/candidate/settings" className="w-full">
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
          <div className="flex flex-row space-x-4 gap-6">
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
    </div>
  );
}
