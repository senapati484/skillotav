import Link from "next/link";
import { CandidateNav } from "@/components/candidate-nav";

export default function CandidateLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/candidate/dashboard" className="text-2xl font-bold">
            SkillChain
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
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
      <CandidateNav />
      </div> */}
      <CandidateNav />
      <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
      {/* <footer className="border-t py-6">
        <div
          className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} SkillChain. All rights reserved.
        </div>
      </footer> */}
    </div>
  );
}
